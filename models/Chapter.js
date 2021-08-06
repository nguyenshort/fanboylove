const mongoose = require('mongoose')

const { autoIncrement } = require('mongoose-plugin-autoinc')
const slug = require('mongoose-slug-generator')

const ChapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nameExtend: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  postActive: {
    type: Number,
    default: 1,
    index: true
  },
  slug: {
    type: String,
    slug: ['name', 'nameExtend'],
    lowercase: true
  },
  story: {
    type: Number,
    ref: 'Story',
    index: true
  },
  views: {
    type: Number,
    default: 0
  },
  note: {
    type: String,
    default: null,
    trim: true
  },
  order: {
    type: Number,
    default: 0,
    index: true
  },
  content: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Number,
    default: Date.now(),
    index: true
  },
  publishTime: {
    type: Number,
    default: Date.now(),
    index: true
  },
  source: {
    type: String,
    index: true,
    unique: true
  }
})

ChapterSchema.plugin(autoIncrement, 'Chapter')
ChapterSchema.plugin(slug)
module.exports = mongoose.model('Chapter', ChapterSchema)
