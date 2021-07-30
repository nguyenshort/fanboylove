const CategoryController = require('../../controller/category.controller')
const ChapterController = require('../../controller/chapter.controller')
const BunnyCDN = require('../../mixins/bunnyCDN')

module.exports = {
  Query: {
    getCategories: async () => {
      const categoryController = new CategoryController()
      return categoryController.all()
    },

    getChapters: async (_, { id }) => {
      const chapterController = new ChapterController()
      const chapters = await chapterController.getMany(id)
      Object.values(chapters).map((chapter) => {
        chapter.avatar = BunnyCDN.webAssets(chapter.avatar, false)
        return chapter
      })
      return chapters
    }
  }
}
