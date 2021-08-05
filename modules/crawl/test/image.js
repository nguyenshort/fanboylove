const Crawl = require('../index')
;(async function () {
  const test = await Crawl.downLoadImage(
    'http://anhnhanh.com/data/images/14692/288647/001.jpg?data=net',
    {
      Referer: 'http://www.nettruyenvip.com/'
    }
  )
  console.log(test)
})()
