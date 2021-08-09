require('dotenv').config({ path: '../../.env' })

const Event = require('../../events')

const database = require('../../database')
database.connect()

const mangaXY = require('../../modules/crawl/site/mangaxy')
;(async function () {
  const Manga = new mangaXY('https://mangaxy.com/')
  await Manga.init()
  const story = await Manga.makeStory(true)
  const chapters = Manga.chapters()
  chapters.forEach((value, index) => {
    if (index === 0) {
      Event.mangaXY(story, value, index)
    }
  })
})()
