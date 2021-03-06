const https = require('https')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const BunnyCDN = require('../../bunnyCDN')

const image = require('../../image/')

module.exports = class {
  async downLoadImage(src, headers = {}) {
    const { data } = await axios.get(src, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      headers,
      responseType: 'arraybuffer'
    })
    return data
  }

  buidPath(story) {
    const time = new Date()
    const _base = `/${time.getFullYear()}/${time.getMonth() + 1}/${
      time.getDay() + 1
    }/${time.getHours()}/${uuidv4()}.jpeg`
    return {
      story: () => '/leech/' + story._id + _base,
      chapter: () => '/leech/' + story._id + '/chapters' + _base
    }
  }

  async upload(secure, stream, path, width, height) {
    if (width) {
      const Image = new image(stream)
      const data = await Image.resize(width, height)
      const Bunny = new BunnyCDN(secure)
      await Bunny.upload(data, path)
      return path
    }
    const Bunny = new BunnyCDN(secure)
    await Bunny.upload(stream, path)
    return path
  }

  async removeMany(images) {
    const Bunny = new BunnyCDN(true)
    for (const image of images) {
      await Bunny.remove(image.content)
    }
  }
}
