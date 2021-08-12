require('dotenv').config({ path: '../.env' })
const medoctruyen = require('../modules/crawl/site/nettruyen')

;(async () => {
  const Leech = new medoctruyen(
    'http://www.nettruyenvip.com/truyen-tranh/ngo-xa/chap-1/748417'
  )
  await Leech.init()
  console.log(Leech.Leech.$.html())
})()
