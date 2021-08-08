require('dotenv').config({ path: '../../.env' })

const database = require('../../database')
database.connect()

const MeDocTruyen = require('../../modules/crawl/site/medoctruyen')
;(async function () {
  return MeDocTruyen()
})()
