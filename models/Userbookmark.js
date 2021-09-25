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
  createdAt: {
    type: Number,
    default: Date.now(),
    index: true
  }
})

ChapterSchema.plugin(autoIncrement, 'Userbookmark')
module.exports = mongoose.model('Userbookmark', ChapterSchema)
