const BaseController = require('./helpers/leech')
const StoreController = require('./helpers/store')
const CloudController = require('./helpers/cloud')

class Index extends BaseController {
  /**
   * _id = 0 là user admin mặc định
   */
  constructor() {
    super()
    this.store = new StoreController()
    this.cloud = new CloudController()
  }

  /**
   * @param images
   * @param story
   * @param headers
   * @returns {Promise<*[]>}
   */
  async downloadListContent(images, story, headers = {}) {
    const content = []
    for (const image of images) {
      console.log('Download:', image)
      const imageContent = await this.cloud.downLoadImage(image, headers)
      const path = this.cloud.buidPath(story).chapter()
      content.push({
        content: await this.cloud.upload(true, imageContent, path)
      })
      console.log('Uploaded:', path)
    }
    return content
  }

  /**
   * @param src
   * @param headers
   * @returns {Promise<string>}
   */
  async downloadAvatar(src, headers) {
    const _avatarData = await this.cloud.downLoadImage(src, headers)
    const path = this.cloud.buidPath({ _id: `avatars` }).story()
    await this.cloud.upload(false, _avatarData, path, 300, 400)
    return path
  }
}

module.exports = Index
