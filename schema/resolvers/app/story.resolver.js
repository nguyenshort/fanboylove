const { ApolloError, ForbiddenError } = require('apollo-server-express')

const StoryController = require('../../../controller/story.controller')
const ChapterController = require('../../../controller/chapter.controller')
const BunnyCDN = require('../../../modules/bunnyCDN')

module.exports = {
  Query: {
    appGetEditorChoice: async (_, { limit }) => {
      const c = new StoryController()
      return c.getEditorChoice(limit)
    },

    appGetRankings: async (_, { order, page, limit }) => {
      const c = new StoryController()
      const stories = await c.getMany(order, page, limit)
      for (const story of stories) {
        story.avatar = BunnyCDN.webAssets(story.avatar)
        story.user.avatar = BunnyCDN.webAssets(story.user.avatar)
      }
      return stories
    },

    appGetStory: async (_, { id }) => {
      const c = new StoryController()
      const story = await c.getOne(id)
      if (!story) {
        throw new ForbiddenError('Nội dung không tồn tại')
      }
      story.avatar = BunnyCDN.webAssets(story.avatar)
      return story
    },

    appGetChapters: async (_, { id }) => {
      const c = new ChapterController()
      const chapters = await c.getMany(id)
      for (const chapter of chapters) {
        chapter.avatar = BunnyCDN.webAssets(chapter.avatar)
      }
      return chapters
    },

    appSearchStories: async (_, { keyword, page, limit }) => {
      const c = new StoryController()
      const stories = await c.getSearchResult(keyword, page, limit)
      for (const story of stories) {
        story.avatar = BunnyCDN.webAssets(story.avatar)
      }
      return stories
    },

    appGetBasicStory: async (_, { id }) => {
      const c = new StoryController()
      const story = await c.getBasicChapter(id)
      if (!story) {
        throw new ForbiddenError('Nội dung không tồn tại')
      }
      story.avatar = BunnyCDN.webAssets(story.avatar)
      return story
    }
  }
}
