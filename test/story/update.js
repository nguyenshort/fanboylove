require('dotenv').config({ path: '../../.env' })

const axios = require('axios')
const cheerio = require('cheerio')

const crawlerController = require('../../app/crawlStory.controller')
const crawlerChapterController = require('../../app/crawlChapter.controller')
const crawler = require('../../app/crawl.controller')

const Event = require('../../events')

const Story = require('../../models/Story')

const database = require('../../database')
database.connect()

async function f() {
  const stories = await Story.find()
  for (const story of stories) {
    try {
      const { data } = await axios.get(story.source)
      const $ = cheerio.load(data)
      const content = $('.detail-content p').text().trim()
      await Story.findByIdAndUpdate(story._id, { content })
      console.log('Done: ', story.source)
    } catch (e) {
      console.log('Lỗi: ', story.source)
    }
  }
}

f()
