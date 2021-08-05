require('dotenv').config({ path: '../../.env' })
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
  stories: '.items .item .image a'
}

const database = require('../../database')
database.connect()
;(async function () {
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
          console.log(content)
          const listCategory = Leech.getText(selector.categories).array()
          const categories = await Leech.store.makeListCategories(listCategory)
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
          Event.nettruyen(story, listChapter[i], i)
        }
      }
    }
  }
})()
