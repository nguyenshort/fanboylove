const Chapter = require('../../../models/Chapter')
const Story = require('../../../models/Story')
const Category = require('../../../models/Category')

module.exports = class {
  async insertChapter(story, name, nameExtend, content, order, source) {
    await Chapter.create({
      name,
      content,
      nameExtend,
      story,
      order,
      createdAt: Date.now(),
      source
    })
    await Story.findByIdAndUpdate(story, {
      countChapter: await Chapter.find({ story }).countDocuments(),
      updatedAt: Date.now()
    })
  }

  async insertStory(
    title,
    otherTitle,
    author,
    team,
    avatar,
    content,
    categories,
    source
  ) {
    return Story.create({
      title,
      otherTitle,
      author,
      team,
      avatar,
      content,
      categories,
      user: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      source
    })
  }

  exist(source) {
    return {
      story: async () => Story.findOne({ source }),
      chapter: async () => Chapter.findOne({ source }),
      title: async () => Story.findOne({ name: source })
    }
  }

  async makeListCategories(list) {
    let categories = []
    for (let name of list) {
      if (name) {
        const category = await Category.findOne({ name })
        if (category) {
          categories.push(category._id)
        }
      }
    }
    return categories
  }
}
