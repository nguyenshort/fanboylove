require('dotenv').config({ path: '../../.env' })

const crawlerController = require('../../app/crawlStory.controller')
const crawlerChapterController = require('../../app/crawlChapter.controller')
const crawler = require('../../app/crawl.controller')

const Event = require('../../events')

const Story = require('../../models/Story')

const yeumanhua = require('../../app/modules/yeumanhua.json')

const database = require('../../database')
database.connect()

async function createStory(source) {
  const CrawlController = new crawlerController(source)
  let book = await CrawlController.checkStory()
  if (!book) {
    try {
      const html = await CrawlController.getSite()
      CrawlController.initialization(html)
      book = await CrawlController.quickCreate(
        yeumanhua.title,
        yeumanhua.content,
        yeumanhua.avatar,
        yeumanhua.avatar_src,
        yeumanhua.categories
      )
      console.log(book)
    } catch (e) {
      console.log(e)
    }
  }
  await CrawlController.start()
  const listChapter = await CrawlController.getListChapter(
    yeumanhua.list_chapter,
    'href',
    true
  )
  for (let i = 0; i < listChapter.length; i++) {
    Event.yeumanhua.yeuManhuaCrawlChapter(listChapter[i], book, i)
  }
}
// createStory('https://umetruyen.com/truyen-ong-bo-don-than-hang-ty.html')

async function manyStory() {
  const list = ['https://yeumanhua.com/truyen-bo-vo-dai-nhan-la-ba-xa.html']
  for (let i = 0; i < list.length; i++) {
    await createStory(list[i])
    await new Promise((resolve) => setTimeout(resolve, 4000))
  }
}

manyStory()

async function createChapter(source) {
  const story = await Story.findById(1)
  const order = await crawlerChapterController.getNextOrder(story)
  Event.saytruyen.crawlChapter(source, story, order)
}

// createChapter('https://umetruyen.com/doc-khong-lam-dan-ong-an-bam-chuong-1.html')

async function crawlImage(url) {
  const Crawler = new crawler(url)
  const test = Crawler.fixUrl(
    'app/manga/uploads/covers/a1b37620c483dfa65c77c95f29797696.jpg'
  )
  console.log(test)
}

// crawlImage('https://umetruyen.com/doc-khong-lam-dan-ong-an-bam-chuong-1.html')

async function addRating() {
  return Story.updateMany({}, { rating: 5 })
}

// addRating()
