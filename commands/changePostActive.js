require('dotenv').config({ path: '../.env' })
const database = require('../database')
database.connect()

const Chapter = require('../models/Chapter')

async function f() {
  await Chapter.updateMany({}, { postActive: 1 })
}

f()
