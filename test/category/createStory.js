require('dotenv').config({ path: '../../.env' })
const axios = require('axios')
const cheerio = require('cheerio')
const { v4: uuidv4 } = require('uuid')

const database = require('../../database')
database.connect()
const Category = require('../../models/Category')
const Story = require('../../models/Story')
const Chapter = require('../../models/Chapter')
const Event = require('../../events')

async function f(id) {
  try {
    // lấy giữ liệu
    const { data } = await axios.get('http://backup.test/story/' + id)
    let story = await Story.findOne({ source: id })
    console.log('raw:', data.title)
    if (!story) {
      const avatar = await uploadtoBunny(
        await downloadImg('https://old.fanboylove.com/' + data.avatar)
      )
      story = await Story.create({
        title: data.title,
        user: 0,
        author: data.author_list,
        team: data.author_tran_list,
        avatar,
        content: data.description,
        source: id,
        views: data.count_view,
        otherTitle: data.title_other
      })
    }
    console.log(story.title)
    // sử dụng event để download chapter
    const chapters = data.chap
    for (let order = 0; order < chapters.length; order++) {
      const check = await Chapter.findOne({ source: chapters[order].id })
      if (!check) {
        Event.crawlChapter(chapters[order], story._id, order)
      }
    }
  } catch (error) {}
}
f(82)

/*
store_in:
1 : server + 'https://old.fanboylove.com/
2: google: giữ nguyên
3: giữ nguyên
4: imgur: giữ nguyên
6: + 'https://photo.fanboylove.com/'
 */

async function downloadImg(url) {
  const { data } = await axios.get(encodeURI(url), {
    responseType: 'stream',
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  })
  return data
}

async function uploadtoBunny(data) {
  const path = '/stories/avatar/' + Date.now() + '_' + uuidv4() + '.jpg'
  await axios.put(`${process.env.BUNNY_STORAGE_SERVER_2}${path}`, data, {
    headers: {
      AccessKey: process.env.BUNNY_ACCESS_KEY_2,
      'Content-Type': 'image/jpeg'
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  })
  return path
}

async function getNextOrder(story) {
  const chapter = await Chapter.findOne({
    story
  })
    .sort({ order: -1 })
    .limit(1)
  return chapter ? chapter.order + 1 : 0
}
