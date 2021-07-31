const CategoryController = require('../../controller/category.controller')

module.exports = {
  Query: {
    getCategories: async () => {
      const categoryController = new CategoryController()
      return categoryController.all()
    }
  }
}
