const events = require('events')
const eventEmitter = new events.EventEmitter()
const UploadListener = require('./listeners/upload')
const ChapterListener = require('./listeners/chapter')
const Leech = require('./listeners/leech')

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

function nettruyenSlow(story, chapters) {
  eventEmitter.once('LEECH_NETTRUYEN_SLOW', Leech.NetTruyenSlow)
  eventEmitter.emit('LEECH_NETTRUYEN_SLOW', story, chapters)
}

function medoctruyenSlow(story, chapters) {
  eventEmitter.once('LEECH_MDT_SLOW', Leech.MeDocTruyenSlow)
  eventEmitter.emit('LEECH_MDT_SLOW', story, chapters)
}

function mangaXYSlow(story, chapters) {
  eventEmitter.once('LEECH_MANGAXY_SLOW', Leech.MangaXYSlow)
  eventEmitter.emit('LEECH_MANGAXY_SLOW', story, chapters)
}

module.exports = {
  removeFile,
  clearChapterContent,
  updateChapterContent,
  medoctruyenSlow,
  nettruyenSlow,
  mangaXYSlow
}
