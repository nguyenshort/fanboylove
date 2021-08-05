const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const resize = require('./resize')
const BunnyCDN = require('../../bunnyCDN')

module.exports = class {
  async downLoadImage(src, headers = {}) {
    const { data } = await axios.get(src, {
      headers,
      responseType: 'arraybuffer'
    })
    return data
  }

  buidPath(story) {
    const time = new Date()
    const _base = `/${time.getFullYear()}/${time.getMonth() + 1}/${
      time.getDay() + 1
    }/${uuidv4()}.jpg`
    return {
      story: () => '/leech/' + story._id + _base,
      chapter: () => '/leech/' + story._id + '/chapters' + _base
    }
  }

  async upload(secure, stream, path, width, height) {
    if (width) {
      const data = await resize(stream, width, height)
      const Bunny = new BunnyCDN(secure)
      await Bunny.upload(data, path)
      return path
    }
    const Bunny = new BunnyCDN(secure)
    await Bunny.upload(stream, path)
    return path
  }
}
