const chapterController = require('../controller/chapter.controller')
module.exports.chapters = async (story) => {
  const Chapter = new chapterController()
  return Chapter.getMany(story)
}
