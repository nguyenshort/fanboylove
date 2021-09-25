const CategoryController = require('../../../controller/category.controller')
const BunnyCDN = require('../../../modules/bunnyCDN')

module.exports = {
  Query: {
    appGetCategories: async () => {
      const categoryController = new CategoryController()
      return categoryController.getCategories()
    },

    appGetManyCategories: async (_, { limit }) => {
      const c = new CategoryController()
      return c.getMany(0, limit)
    },

    appGetCategory: async (_, { id }) => {
      const c = new CategoryController()
      return c.getOne(id)
    },

    appCategoryGetStory: async (_, { id, order, page, limit }) => {
      const c = new CategoryController()
      const stories = await c.getStories(id, order, page, limit)
      for (const story of stories) {
        story.avatar = BunnyCDN.webAssets(story.avatar)
      }
      return stories
    }
  }
}
