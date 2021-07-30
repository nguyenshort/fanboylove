const Story = require('../models/Story')
const Chapter = require('../models/Chapter')
class ChapterController {
  async getMany(story) {
    return Chapter.find({ story }).sort({ order: -1 })
  }

  async getOne(_id) {
    const chapter = await Chapter.findOne({ _id })
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
    return Chapter.find({}, { _id: 1, slug: 1, story: 1 }).populate({
      path: 'story',
      model: Story,
      select: '_id slug'
    })
  }
}

module.exports = ChapterController
