require('dotenv').config({ path: '../../.env' })

const crawlController = require('../../modules/crawl')

const database = require('../../database')
database.connect()
;(async function f() {
  try {
    const HTML = await crawlController.getSite(
      'https://mangaxy.com/tai-ha-la-than-tinh-yeu-14913/'
    )
    if (HTML) {
      const Crawl = new crawlController()
      Crawl.load(HTML)
      const listChapter = Crawl.getAttr(
        '.episodes-wrap.matrix .episode-item'
      ).array()
      for (const chapter of listChapter.reverse()) {
        const chapterHTML = await crawlController.getSite(chapter)
        // reload cheerio
        Crawl.load(chapterHTML)
        const listIMG = Crawl.getAttr(
          '.reading-detail .page-chapter img',
          'src'
        ).array()
        const content = Crawl.listToContent(listIMG)
        const name = Crawl.getText('#chapnum')
        await Crawl.createChapter(87, name, '', '', content)
        console.log('Create', name, content.length)
      }
      console.log('Done')
    }
  } catch (e) {
    console.log(e)
  }
})()
