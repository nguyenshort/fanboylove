const mongoose = require('mongoose')

const { autoIncrement } = require('mongoose-plugin-autoinc')

const ChapterSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  storyID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

ChapterSchema.plugin(autoIncrement, 'Banner')

module.exports = mongoose.model('Banner', ChapterSchema)
