const CronJob = require('cron').CronJob

const crawlController = require('../../modules/crawl')
const Event = require('../../events')

const selector = {
  chapters: '#item-detail .chapter a',
  avatar: '.col-image img',
  Referer: 'http://www.nettruyenvip.com/',
  title: '#item-detail h1.title-detail',
  content: '.detail-content p',
  categories: '.list-info .kind .col-xs-8 a',
  author: '.list-info .author .col-xs-8',
  site: 'http://www.nettruyenvip.com/tim-truyen/dam-my',
  stories: '.items .item .image a',

  name: '.reading .top .txt-primary span',
  images: '.reading-detail .page-chapter img'
}

module.exports = new CronJob(
  '* */20 * * * *',
  async () => {
    try {
      const Leech = new crawlController()
      const HTML = await Leech.getSite(selector.site)
      if (HTML) {
        Leech.load(HTML)
        const stories = Leech.getAttr(selector.stories, 'href').array()
        for (const source of stories) {
          Leech.load(await Leech.getSite(source))
          const listChapter = Leech.getAttr(selector.chapters, 'href')
            .array()
            .reverse()
          if (listChapter.length) {
            let story = await Leech.store.exist(source).story()
            if (!story) {
              const title = Leech.getText(selector.title).single()
              // avatar mặc định
              let avatar = '/'
              const avatarLink = Leech.getAttr(selector.avatar, 'src').single()
              if (avatarLink) {
                avatar = await Leech.downloadAvatar('http:' + avatarLink, {
                  Referer: selector.Referer
                })
              }
              const content = Leech.getText(selector.content).single()
              const listCate = Leech.getText(selector.categories).array()
              const categories = await Leech.store.makeListCategories(listCate)
              const author = Leech.getText(selector.author).single()
              story = await Leech.store.insertStory(
                title,
                '',
                author,
                '',
                avatar,
                content,
                categories,
                source
              )
            }
            for (let i = 0; i < listChapter.length; i++) {
              const check = await Leech.store.exist(listChapter[i]).chapter()
              if (!check) {
                const deplay = new Promise((resolve) =>
                  setTimeout(() => {
                    Event.nettruyen(story, listChapter[i], i)
                    resolve()
                  }, 4000)
                )
                await deplay
              } else {
              }
              // await lechChap(story, listChapter[i], i)
            }
          }
        }
      }
    } catch (e) {
      console.log('Error when publish Chapter')
    }
  },
  null,
  true,
  'Asia/Ho_Chi_Minh'
)

async function lechChap(story, source, order) {
  try {
    console.log('Chap', source)
    const Leech = new crawlController()
    const chapter = await Leech.store.exist(source).chapter()
    if (!chapter) {
      const chapterHTML = await Leech.getSite(source)
      if (chapterHTML) {
        Leech.load(chapterHTML)
        const name = Leech.getText(selector.name)
          .single()
          .replace(/^-/, '')
          .trim()
        if (name) {
          // lấy list image và build thành link
          const listImages = Leech.getAttr(selector.images, 'src')
            .array()
            .map((value) => 'http:' + value)

          if (listImages.length) {
            const content = await Leech.downloadListContent(listImages, story, {
              Referer: selector.Referer
            })
            if (content.length) {
              await Leech.store.insertChapter(
                story._id,
                name,
                '',
                content,
                order,
                source
              )
              console.log('Created', name, content.length)
            }
          }
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
