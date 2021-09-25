const ChapterController = require('../../../controller/chapter.controller')
const BunnyCDN = require('../../../modules/bunnyCDN')

module.exports = {
  Query: {
    appGetChapter: async (_, { id }, { user }) => {
      const c = new ChapterController(user)
      const chapter = await c.getChapter(id)
      for (const item of chapter.content) {
        item.content = BunnyCDN.webAssets(item.content, true)
      }
      return chapter
    }
  }
}
