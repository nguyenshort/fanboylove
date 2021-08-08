const events = require('events')
const eventEmitter = new events.EventEmitter()
const UploadListener = require('./listeners/upload')
const ChapterListener = require('./listeners/chapter')
const Leech = require('../modules/crawl/chapters')

function removeFile(path) {
  eventEmitter.once('REMOVE_FILE', UploadListener.removeFile)
  eventEmitter.emit('REMOVE_FILE', path)
}

function clearChapterContent(content) {
  eventEmitter.once('CLEAR_CHAPTER_CONTENT', ChapterListener.clearChapter)
  eventEmitter.emit('CLEAR_CHAPTER_CONTENT', content)
}

function updateChapterContent(_id, oldContent, content) {
  eventEmitter.once('UPDATE_CHAPTER_CONTENT', ChapterListener.updateChapter)
  eventEmitter.emit('UPDATE_CHAPTER_CONTENT', _id, oldContent, content)
}

function nettruyen(story, source, order) {
  eventEmitter.once('LEECH_NETTRUYEN', Leech.NetTruyen)
  eventEmitter.emit('LEECH_NETTRUYEN', story, source, order)
}

function medoctruyen(story, source) {
  eventEmitter.once('LEECH_MEDOCTRUYEN', Leech.MeDocTruyen)
  eventEmitter.emit('LEECH_MEDOCTRUYEN', story, source)
}

module.exports = {
  removeFile,
  clearChapterContent,
  updateChapterContent,
  nettruyen,
  medoctruyen
}
