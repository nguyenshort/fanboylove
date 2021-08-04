require('dotenv').config({ path: '../.env' })
const bunnyCDN = require('../modules/bunnyCDN')

;(async () => {
  try {
    const BunnyCDN = new bunnyCDN(true)
    const test = await BunnyCDN.remove(
      '/test/content/056c93b5-0975-41c3-8216-c567a88832fb.jpg'
    )
    console.log(test)
  } catch (error) {
    console.log(error)
  }
})()
