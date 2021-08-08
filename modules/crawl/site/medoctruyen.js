const crawlController = require('../index')
const Event = require('../../../events')

const selector = {
  site: 'https://www.medoctruyentranh.net/tim-truyen/dam-my',
  stories: '.classifyList > a',
  avatar: '.detail_info img',
  title: '.detail_infos .title',
  team: '#title + .other_infos > div:last-child font',
  author: '#title + .other_infos > div:first-child font',
  content: '.other_infos .summary',
  category: '.detail_infos .other_infos > div a',
  Referer: 'https://www.medoctruyentranh.net/'
}

module.exports = async () => {
  try {
    const Leech = new crawlController()
    const HTML = await Leech.getSite(selector.site)
    Leech.load(HTML)
    const stories = Leech.getAttr(selector.stories, 'href').array()
    for (const source of stories) {
      Leech.load(await Leech.getSite(source))
      let story = await Leech.store.exist(source).story()
      if (story) {
        const listChapter = Leech.getAttr('.chapters a', 'href').array()
        for (const chapter of listChapter) {
          const check = await Leech.store.exist(chapter).chapter()
          if (!check) {
            const deplay = new Promise((resolve) =>
              setTimeout(() => {
                Event.medoctruyen(story, chapter)
                resolve()
              }, 3000)
            )
            await deplay
          }
        }
      }
    }
  } catch (e) {
    console.log('Error when crawl medoctruyen')
  }
}
