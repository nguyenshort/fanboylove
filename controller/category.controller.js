const { ForbiddenError } = require('apollo-server-express')

const Story = require('../models/Story')
const Category = require('../models/Category')

const StoryController = require('./story.controller')
const BunnyCDN = require('../modules/bunnyCDN')

class CategoryController {
  async getOne(_id) {
    const category = await Category.findById(_id)
    if (!category) {
      throw new ForbiddenError('Nội dung không tồn tại')
    }
    return category
  }

  async getStories(id, order, page, limit) {
    return Story.find({
      categories: {
        $elemMatch: { $eq: id }
      }
    })
      .populate({
        path: 'categories',
        model: Category
      })
      .sort({
        [order]: -1
      })
      .skip(page * limit)
      .limit(limit)
  }

  async categoryGetBooks(id, order, page, limit) {
    const stories = await this.getStories(id, order, page, limit)
    const storyController = new StoryController()
    return storyController.addChaptersToStory(stories, 2)
  }

  async getCountStory(_id) {
    return Story.find({
      categories: {
        $elemMatch: { $eq: _id }
      }
    }).countDocuments()
  }

  async all() {
    return Category.find()
  }

  async getCategories() {
    const categories = await this.all()
    const list = []
    for (const category of categories) {
      list.push(
        new Promise(async (resolve, reject) => {
          const item = {
            category: category,
            count: await this.getCountStory(category._id),
            stories: await Story.find({
              categories: {
                $elemMatch: { $eq: await category._id }
              }
            }).limit(2)
          }
          resolve(item)
        })
      )
    }
    return (await Promise.all(list))
      .filter((item, index) => item.count > 1)
      .map((value) => {
        value.stories[0].avatar = BunnyCDN.webAssets(value.stories[0].avatar)
        value.stories[1].avatar = BunnyCDN.webAssets(value.stories[1].avatar)
        return value
      })
  }

  static async forSiteMap() {
    return Category.find({}, { _id: 1, slug: 1 })
  }

  /**
   * For app
   */
  async getMany(page, limit) {
    return Category.find()
      .skip(page * limit)
      .limit(limit)
  }
}

module.exports = CategoryController
