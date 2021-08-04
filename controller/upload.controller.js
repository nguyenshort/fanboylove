const { v4: uuidv4 } = require('uuid')
const bunnycdn = require('../modules/bunnyCDN')
const Event = require('../events')
const sharp = require('sharp')

class UploadController {
  /**
   * @param file
   * @param width
   * @param height
   * @returns {Promise<Buffer>}
   * @private
   */
  async _resizeImage(file, width, height) {
    return await sharp(file.path)
      .resize(width, height, { fit: 'cover' })
      .toBuffer()
  }

  /**
   * @param path
   * @returns {string}
   * @private
   */
  _buildPath(path) {
    const time = new Date()
    return `/${path}/${time.getFullYear()}/${time.getMonth() + 1}/${
      time.getDay() + 1
    }/${uuidv4()}.jpg`
  }

  /**
   * @param { { path: String } } file
   * @param { String } path
   * @returns {Promise<null>}
   */
  async uploadSingle(file, path) {
    try {
      let { image, securePath } = await this._detachPath(path, file)
      let path1 = this._buildPath(path)
      const BunnyCDN = new bunnycdn(securePath)
      await BunnyCDN.upload(image, path1)
      Event.removeFile(file.path)
      return bunnycdn.webAssets(path1, securePath)
    } catch (e) {
      Event.removeFile(file.path)
      return null
    }
  }

  /**
   * Xác định secure pth và resize
   * @param path
   * @param file
   * @returns {Promise<{image: *, securePath: boolean}>}
   * @private
   */
  async _detachPath(path, file) {
    let image
    let securePath
    if (path.match('user/[0-9]*/avatar')) {
      // user avatar
      image = await this._resizeImage(file, 150, 150)
      securePath = false
    } else if (path.match('user/[0-9]*/banner')) {
      // user banner
      image = await this._resizeImage(file, 980)
      securePath = false
    } else if (path.match('story/[0-9]*/avatar') || path === 'temp/story') {
      // ảnh bìa truyện
      image = await this._resizeImage(file, 300, 400)
    } else if (path.match('chapters/avatar')) {
      // ảnh bìa chương truyện
      image = await this._resizeImage(file, 500, 312)
      securePath = false
    } else if (path.match('chapters/content')) {
      // nội dung chap
      image = await this._resizeImage(file, 800)
      securePath = true
    } else if (path.match('banners')) {
      // bình luận
      securePath = false
      image = await this._resizeImage(file, 800)
    } else {
      // các hình còn lại
      securePath = false
      image = await this._resizeImage(file, 300)
    }
    return { image, securePath }
  }
}

module.exports = UploadController
