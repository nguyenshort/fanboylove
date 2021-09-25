const { ApolloError, ForbiddenError } = require('apollo-server-express')

const BookmarkController = require('../../../controller/bookmark.controller')

module.exports = {
  Query: {
    appCheckBookmak: async (_, { story }, { user }) => {
      const c = new BookmarkController(user)
      return c.check(story)
    }
  },
  Mutation: {
    appBookmark: async (_, { story }, { user }) => {
      const c = new BookmarkController(user)
      return c.toggle(story)
    }
  }
}
