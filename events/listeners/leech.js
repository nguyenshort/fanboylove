const netTruyen = require('../../modules/crawl/site/nettruyen')
const meDocTruyen = require('../../modules/crawl/site/medoctruyen')

module.exports = {
  NetTruyen: async (story, source) => {
    const NetTruyen = new netTruyen(source)
    const chapters = NetTruyen.chapters()
    if (chapters.length) {
      const story = await NetTruyen.makeStory()
      await NetTruyen.importChapters(
        story,
        chapters,
        async (chapter, exist, index) => {
          if (!exist) {
            await NetTruyen.reInit(chapter)
            return NetTruyen.importChapter(story, index)
          }
        }
      )
    }
  },

  MeDocTruyen: async (story, source) => {
    const MeDocTruyen = new meDocTruyen(source)
    await MeDocTruyen.init()
    return MeDocTruyen.importChapter(story)
  }
}
