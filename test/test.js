require('dotenv').config({ path: '../.env' })
const Story = require('../models/Story')
const db = require('../database')
db.connect()
;(async () => {
  const stories = await Story.find({
    source: {
      $regex: 'medoctruyen',
      $options: 'i'
    }
  })
  console.log(stories)
})()
