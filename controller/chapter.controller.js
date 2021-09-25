const { ApolloError, ForbiddenError } = require('apollo-server-express')

const Story = require('../models/Story')
const Chapter = require('../models/Chapter')
const ChapterPurchased = require('../models/ChapterPurchased')

const STORY = require('../config/chapter')

class ChapterController {
  constructor(user) {
    this.user = user
  }

  async getMany(story) {
    return Chapter.find({ story, postActive: STORY.ACTIVE })
      .sort({ order: -1 })
      .select('-content -source')
  }

  async getOne(_id) {
    const chapter = await Chapter.findOne({ _id, postActive: STORY.ACTIVE })
    if (!chapter) {
      return null
    }
    await Promise.all([
      Chapter.findByIdAndUpdate(_id, { $inc: { views: 1 } }),
      Story.findByIdAndUpdate(chapter.story, { $inc: { views: 1 } })
    ])
    return chapter
  }

  static async forSiteMap() {
    return Chapter.find({ postActive: STORY.ACTIVE }, { _id: 1, slug: 1, story: 1 }).populate({
      path: 'story',
      model: Story,
      select: '_id slug'
    })
  }

  // For app
  async getChapter(_id) {
    const chapter = await Chapter.findOne({ _id, postActive: STORY.ACTIVE })
    if (!chapter) {
      throw new ForbiddenError('Chương không tồn tại')
    }
    // chương free
    if (chapter.lock === 0) {
      chapter.answer = ''
      return chapter
    }
    if (!this.user) {
      // cắt chỉ hiện 3 tranh
      chapter.content.length = 3
      chapter.answer = ''
      return chapter
    }
    // lấy danh sách chương đã mua
    const purchased = await this._checkPurchased(chapter.story, chapter._id)
    if (!purchased) {
      chapter.answer = ''
      chapter.content.length = 3
      return chapter
    }
    chapter.answer = ''
    return chapter
  }

  async getPurchased(story) {
    return ChapterPurchased.findOne({ user: this.user._id, story })
  }

  /**
   * Kiểm tra xem chương đã mua hay chưa
   * @param story
   * @param chapID
   * @returns {Promise<void>}
   * @private
   */
  async _checkPurchased(story, chapID) {
    return ChapterPurchased.findOne({
      user: this.user,
      story,
      purchased: {
        $elemMatch: { $eq: chapID }
      }
    })
  }
}

module.exports = ChapterController
