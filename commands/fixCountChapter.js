require('dotenv').config({ path: '../.env' })
const database = require('../database')
database.connect()

const Story = require('../models/Story')
const Chapter = require('../models/Chapter')

async function f() {
  await Story.updateMany({}, { $unset: { source: 1 } })
}

f()
