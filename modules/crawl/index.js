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
    try {
      const list = []
      for (const image of images) {
        list.push(
          new Promise(async (resolve, reject) => {
            try {
              const imageContent = await this.cloud.downLoadImage(
                image,
                headers
              )
              const path = this.cloud.buidPath(story).chapter()
              content.push({
                content: await this.cloud.upload(true, imageContent, path)
              })
              resolve(path)
            } catch (e) {
              reject()
            }
          })
        )
      }
      await Promise.all(list)
      return content
    } catch (e) {
      console.log('Error', 'Cleaning....')
      await this.cloud.removeMany(content)
      console.log('Clear', content.length, 'image')
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
