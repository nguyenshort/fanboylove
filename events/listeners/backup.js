const Chapter = require('../../models/Chapter')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
module.exports.downloadChapter = async (chapter, story, order) => {
  try {
    let prefix = ''
    if (chapter.images.store_in === 1) {
      prefix = 'https://old.fanboylove.com/'
    } else if (chapter.images.store_in === 6) {
      prefix = 'https://photo.fanboylove.com/'
    }
    console.log('Add: ' + chapter.name + ' prefix: ' + prefix)
    const content = await getListImage(JSON.parse(chapter.images.data), prefix)
    if (content.length) {
      const newChapter = await Chapter.create({
        name: chapter.name,
        nameExtend: chapter.name_extend,
        views: chapter.count_view,
        story,
        order,
        content,
        createdAt: Date.now(),
        source: chapter.id
      })
      console.log(newChapter.name)
    }
  } catch (e) {}
}

async function dowloadAndUpload(url) {
  try {
    const image = await downloadImg(url)
    return uploadtoBunny(image)
  } catch (e) {
    console.log('lỗi', url)
    return null
  }
}

async function downloadImg(url) {
  const { data } = await axios.get(encodeURI(url), {
    responseType: 'stream',
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  })
  return data
}

async function uploadtoBunny(data) {
  const path = '/chapters/content/' + Date.now() + '_' + uuidv4() + '.jpg'
  await axios.put(`${process.env.BUNNY_STORAGE_SERVER}${path}`, data, {
    headers: {
      AccessKey: process.env.BUNNY_ACCESS_KEY,
      'Content-Type': 'image/jpeg'
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  })
  return path
}

async function getListImage(source, prefix) {
  const images = []
  for (const element of Object.values(source)) {
    console.log(element.src)
    const content = await dowloadAndUpload(prefix + element.src)
    if (content) {
      images.push({
        content
      })
    }
  }
  return images
}
