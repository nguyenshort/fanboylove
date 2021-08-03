require('dotenv').config({ path: '../../.env' })

const axios = require('axios')
const Chapter = require('../../models/Chapter')

const database = require('../../database')
database.connect()
const bunnyCDN = require('../../mixins/bunnyCDN')
const { v4: uuidv4 } = require('uuid')

;(async function f() {
  try {
    const query = JSON.stringify({
      query: `query getChapters($id: Float!) {
    getChapters(id: $id) {
        _id
        name
        slug
    }
  }`,
      variables: { id: 59 }
    })
    let config = {
      headers: {
        authority: 'api.webdammy.com',
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        accept: '*/*',
        'user-agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        'content-type': 'application/json',
        origin: 'https://webdammy.com',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        referer: 'https://webdammy.com/',
        'accept-language':
          'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5,zh-CN;q=0.4,zh;q=0.3'
      }
    }
    const { data } = await axios.post(
      'https://api.webdammy.com/graphql',
      query,
      config
    )
    const BunnyCDN = new bunnyCDN(true)
    let order = 20
    for (const chapter of Array.from(data.data.getChapters).reverse()) {
      const check = await Chapter.findOne({ story: 68, name: chapter.name })
      if (check || chapter._id === 1909) {
        continue
      }
      console.log('Crawl ID:', chapter._id)
      // tạo chương
      const query2 = JSON.stringify({
        query: `query getChapter($id: Float!) {
                getChapter(id: $id) {
                    _id
                    name
                    slug
                    content
                }
              }`,
        variables: { id: chapter._id }
      })
      const {
        data: {
          data: { getChapter }
        }
      } = await axios.post('https://api.webdammy.com/graphql', query2, config)
      const content = []
      for (const image of getChapter.content) {
        console.log('Dowload:', image.src)
        const imgData = await axios.get(image.src, {
          responseType: 'stream'
        })
        const path = `story/68/chapters/content/` + uuidv4() + '.jpg'
        await BunnyCDN.upload(imgData.data, path)
        content.push({ content: path })
        console.log('Tạo:', path)
      }
      const newChapter = await Chapter.create({
        name: chapter.name,
        content,
        order,
        createdAt: Date.now(),
        story: 68
      })
      console.log('Đã tạo:', newChapter._id, newChapter.name, order)
      order++
    }
    console.log('Done')
  } catch (e) {
    console.log(e)
  }
})()
