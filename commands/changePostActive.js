require('dotenv').config({ path: '../.env' })
const database = require('../database')
database.connect()

const Chapter = require('../models/Chapter')
const Story = require('../models/Story')

async function f() {
  const stories = await Story.find()
  for (let story of stories) {
    await Story.findByIdAndUpdate(story._id, {
      countChapter: await Chapter.find({ story: story._id }).countDocuments()
    })
  }
}

f()
