const events = require('events')
const eventEmitter = new events.EventEmitter()
const UploadListener = require('./listeners/upload')

const BackupListener = require('./listeners/backup')

function removeFile(path) {
  eventEmitter.once('REMOVE_FILE', UploadListener.removeFile)
  eventEmitter.emit('REMOVE_FILE', path)
}

function crawlChapter(chapter, story, order) {
  eventEmitter.once('CRAWL_CHAPTER', BackupListener.downloadChapter)
  eventEmitter.emit('CRAWL_CHAPTER', chapter, story, order)
}
module.exports = {
  removeFile,
  crawlChapter
}
