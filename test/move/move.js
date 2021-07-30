require('dotenv').config({ path: '../../.env' })
const database = require('../../database')
database.connect()

const chapters = require('./chapter.json')
const chapters_images = require('./chapter_image.json')
const stoties = require('./story.json')

async function move() {
  for (let story of stoties) {
    console.log(story)
  }
}
move()
