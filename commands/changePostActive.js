require('dotenv').config({ path: '../.env' })
const database = require('../database')
database.connect()

const Chapter = require('../models/Chapter')
const Story = require('../models/Story')

async function f() {
  const stories = await Story.find({ source: { $exists: true } })
  for (let story of stories) {
    await Promise.all([
      Story.findByIdAndRemove(story._id),
      Chapter.deleteMany({ story: story._id })
    ])
  }
}

f()
