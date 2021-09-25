require('dotenv').config({ path: '../.env' })
const database = require('../database')
database.connect()

const Chapter = require('../models/Chapter')
const Story = require('../models/Story')

async function f() {
  const stories = await Story.find({
    source: {
      $regex: /http:\/\/www.nettruyenvip.com/
    }
  })
  for (const story of stories) {
    await Chapter.findOneAndDelete({ story: story._id })
    await Story.findByIdAndDelete(story._id)
  }
}

f()
