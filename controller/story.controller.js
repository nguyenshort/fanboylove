const Story = require('../models/Story')
const Chapter = require('../models/Chapter')
const Category = require('../models/Category')
const User = require('../models/User')
const EditorChoice = require('../models/EditorChoice')

const CHAPTER = require('../config/chapter')

const storyPopulate = [
  {
    path: 'categories',
    model: Category
  },
  {
    path: 'user',
    model: User
  }
]

class StoryController {
  async getOne(_id) {
    return Story.findById(_id).populate(storyPopulate)
  }

  /**
   * @param order
   * @param page
   * @param limit
   * @returns {Promise<Query<Array<EnforceDocument<unknown, {}>>, Document<any, any, unknown>, {}, unknown>>}
   */
  async getMany(order, page, limit) {
    return Story.find({})
      .populate(storyPopulate)
      .sort({
        [order]: -1
      })
      .skip(page * limit)
      .limit(limit)
  }

  async getManyWithChapter(order, page, limit, countChapter) {
    const stories = await this.getMany(order, page, limit)
    return this.addChaptersToStory(stories, countChapter)
  }

  async addChaptersToStory(stories, countChapter) {
    const result = []
    for (let story of stories) {
      const chapters = await Chapter.find({
        story: story._id,
        postActive: CHAPTER.ACTIVE
      })
        .select('-content')
        .sort({ order: -1 })
        .limit(countChapter)
      result.push({ story, chapters })
    }
    return result
  }

  async count() {
    return Story.countDocuments()
  }

  async searchCount(keyword) {
    return Story.find({
      title: {
        $regex: keyword,
        $options: 'i'
      }
    }).countDocuments()
  }

  async search(keyword, page, limit) {
    const stories = await this.getSearchResult(keyword, page, limit)
    return this.addChaptersToStory(stories, 2)
  }

  async getSearchResult(keyword, page, limit) {
    return Story.find({
      title: {
        $regex: keyword,
        $options: 'i'
      }
    })
      .populate([
        {
          path: 'categories',
          model: Category
        }
      ])
      .skip(page * limit)
      .limit(limit)
  }

  async quickSearch(keyword, size) {
    return Story.find({
      title: {
        $regex: keyword,
        $options: 'i'
      }
    }).limit(size)
  }

  static async forSiteMap() {
    return Story.find({}, { _id: 1, slug: 1, updatedAt: 1 })
  }

  /**
   * Phần dành cho app
   */
  async getEditorChoice(limit) {
    return EditorChoice.find()
      .populate([
        {
          path: 'story',
          model: Story,
          populate: storyPopulate
        }
      ])
      .limit(limit)
  }

  async getBasicChapter(_id) {
    return Story.findById(_id)
  }
}

module.exports = StoryController
