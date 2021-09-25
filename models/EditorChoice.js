const mongoose = require('mongoose')

const { autoIncrement } = require('mongoose-plugin-autoinc')

const ChapterSchema = new mongoose.Schema({
  badge: {
    type: String
  },
  story: {
    type: Number,
    ref: 'Story'
  },
  image: {
    type: String
  }
})

ChapterSchema.plugin(autoIncrement, 'EditorChoice')

module.exports = mongoose.model('EditorChoice', ChapterSchema)
