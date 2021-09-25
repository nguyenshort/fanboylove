require('dotenv').config({ path: '../.env' })
const database = require('../database')
database.connect()

const Story = require('../models/Story')

const netTruyen = require('../modules/crawl/site/nettruyen')

async function f() {
  const stories = await Story.find({
    source: {
      $regex: /http:\/\/www.nettruyenpro.com/
    }
  })
  for (const story of stories) {
    const Nettruyen = new netTruyen(story.source)
    await Nettruyen.init()
    const link = Nettruyen.Leech.getAttr('.col-image img', 'src').single()
    console.log(story.title)
    /*const avatar = await Nettruyen.Leech.downloadAvatar(
      /^(http|https)/.test(link) ? link : 'http:' + value,
      {
        Referer: 'http://www.nettruyenpro.com/'
      }
    )*/
    // Story.findByIdAndDelete(story._id)
    // console.log('Done ', avatar)
  }
  console.log('Done')
}

f()
