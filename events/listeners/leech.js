const netTruyen = require('../../modules/crawl/site/nettruyen')
const meDocTruyen = require('../../modules/crawl/site/medoctruyen')
const mangaXY = require('../../modules/crawl/site/mangaxy')

module.exports = {
  NetTruyen: async (story, source, order) => {
    const NetTruyen = new netTruyen(source)
    await NetTruyen.init()
    return NetTruyen.importChapter(story, order)
  },

  NetTruyenSlow: async (story, chapters) => {
    const NetTruyen = new netTruyen()
    return NetTruyen.importChaptersShow(story, chapters)
  },

  MeDocTruyen: async (story, source) => {
    const MeDocTruyen = new meDocTruyen(source)
    await MeDocTruyen.init()
    return MeDocTruyen.importChapter(story)
  },

  MangaXY: async (story, source, order) => {
    const Manga = new mangaXY(source)
    await Manga.init()
    return Manga.importChapter(story, order)
  }
}
