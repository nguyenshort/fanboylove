const mongoose = require('mongoose')

const { autoIncrement } = require('mongoose-plugin-autoinc')

const ChapterSchema = new mongoose.Schema({
  story: {
    type: Number,
    ref: 'Story',
    index: true
  },
  user: {
    type: Number,
    ref: 'User',
    index: true
  },
  purchased: {
    type: [String],
    default: []
  }
})

ChapterSchema.plugin(autoIncrement, 'ChapterPurchased')

module.exports = mongoose.model('ChapterPurchased', ChapterSchema)
