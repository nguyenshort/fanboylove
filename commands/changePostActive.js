require('dotenv').config({ path: '../.env' })
const database = require('../database')
database.connect()

const Chapter = require('../models/Chapter')
const Story = require('../models/Story')

async function f() {
  await Story.updateMany({}, { team: 'Cơ Tình Các' })
}

f()
