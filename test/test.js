require('dotenv').config({ path: '../.env' })
const db = require('../database')
db.connect()
const Banner = require('../models/Tag')

;(async () => {
  const banner = Banner.insertMany([
    {
      name: ''
    }
  ])
})()
