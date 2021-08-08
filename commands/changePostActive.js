require('dotenv').config({ path: '../.env' })
const database = require('../database')
database.connect()

const Chapter = require('../models/Chapter')

async function f() {
  await Chapter.create({
    name: 0,
    story: 1000,
    content: [],
    source: 'fanboylove.com'
  })
}

f()
