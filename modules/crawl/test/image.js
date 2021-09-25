const Crawl = require('../site/nettruyen')
;(async function () {
  const test = new Crawl(
    'http://www.nettruyenpro.com/truyen-tranh/nghich-tap-chi-hao-dung-nhan-sinh-35943'
  )
  await test.init()
  const link = test.Leech.getAttr('.col-image img', 'src').single()
  console.log(link.replace(/^http(s)?:\/\//, ''))
})()
