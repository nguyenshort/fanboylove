const netTruyen = require('../../modules/crawl/site/nettruyen')
const meDocTruyen = require('../../modules/crawl/site/medoctruyen')

module.exports = {
  NetTruyen: async (story, source) => {
    const NetTruyen = new netTruyen(source)
    await NetTruyen.init()
    const chapters = NetTruyen.chapters()
    if (chapters.length) {
      const story = await NetTruyen.makeStory()
      await NetTruyen.importChapters(story, chapters)
    }
  },

  MeDocTruyen: async (story, source) => {
    const MeDocTruyen = new meDocTruyen(source)
    await MeDocTruyen.init()
    return MeDocTruyen.importChapter(story)
  }
}
