const { ApolloError, ForbiddenError } = require('apollo-server-express')
const UserBookmak = require('../models/Userbookmark')
const Story = require('../models/Story')

module.exports = class {
  constructor(user) {
    this.user = user
  }

  async check(story) {
    if (!this.user) {
      return null
    }
    return UserBookmak.findOne({ user: this.user._id, story })
  }

  async toggle(_id) {
    if (!this.user) {
      throw new ForbiddenError('Nội dung không tồn tại')
    }
    // kiểm tra xem đã bookmark chưa
    const [check, story] = await Promise.all([this.check(_id), Story.findById(_id)])

    if (!story) {
      throw new ForbiddenError('Nội dung không tồn tại')
    }
    const [newStory, bookmark] = await Promise.all([
      Story.findByIdAndUpdate(
        story._id,
        {
          $inc: {
            bookmarks: check ? -1 : 1
          }
        },
        {
          returnOriginal: false
        }
      ),
      check
        ? UserBookmak.findByIdAndDelete(check._id)
        : UserBookmak.create({ user: this.user._id, story: _id })
    ])
    return {
      story: newStory,
      bookmark: check ? null : bookmark,
      user: this.user
    }
  }
}
