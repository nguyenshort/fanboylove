require('dotenv').config({ path: '../.env' })
const axios = require('axios')
const https = require('https')

;(async () => {
  const data = await axios.get(
    'http://truyengroup.net/data/images/27158/542762/001-fix.jpg?data=net',
    {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      headers: {
        Referer: 'http://www.nettruyenvip.com/'
      }
    }
  )
  console.log(data)
})()
