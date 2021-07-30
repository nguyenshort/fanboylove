const StoryController = require('../../controller/story.controller')
const ChapterController = require('../../controller/chapter.controller')
const CategoryController = require('../../controller/category.controller')

module.exports = {
  Query: {
    getStory: async (_, { id }) => {
      const storyController = new StoryController()
      return storyController.getOne(id)
    },

    getStories: async (_, { order, page, limit }) => {
      const storyController = new StoryController()
      return storyController.getMany(order, page, limit)
    },

    getBooksWithChapter: async (_, { order, page, limit }) => {
      const storyController = new StoryController()
      return storyController.getManyWithChapter(order, page, limit, 2)
    },

    getChapters: async (_, { id }) => {
      const chapterController = new ChapterController()
      return chapterController.getMany(id)
    },

    getCategory: async (_, { id }) => {
      const categoryController = new CategoryController()
      return categoryController.getOne(id)
    },

    categoryToBooksAndChapters: async (_, { id, order, page, limit }) => {
      const categoryController = new CategoryController()
      return categoryController.categoryGetBooks(id, order, page, limit)
    },

    categoryToCountStory: async (_, { id }) => {
      const categoryController = new CategoryController()
      return categoryController.getCountStory(id)
    },

    getCategories: async () => {
      const categoryController = new CategoryController()
      return categoryController.all()
    },

    getChapter: async (_, { id }) => {
      const chapterController = new ChapterController()
      return chapterController.getOne(id)
    },

    quickSearch: async (_, { keyword, size }) => {
      const storyController = new StoryController()
      return storyController.quickSearch(keyword, size)
    },

    getSearch: async (_, { keyword, page, limit }) => {
      const storyController = new StoryController()
      return storyController.search(keyword, page, limit)
    }
  }
}
