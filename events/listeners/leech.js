const netTruyen = require('../../modules/crawl/site/nettruyen')
const meDocTruyen = require('../../modules/crawl/site/medoctruyen')

module.exports = {
  NetTruyen: async (story, source, order) => {
    const NetTruyen = new netTruyen(source)
    await NetTruyen.init()
    return NetTruyen.importChapter(story, order)
  },

  MeDocTruyen: async (story, source) => {
    const MeDocTruyen = new meDocTruyen(source)
    await MeDocTruyen.init()
    return MeDocTruyen.importChapter(story)
  }
}
