const crawlController = require('../../modules/crawl')

const selector = {
  name: '.reading .top .txt-primary span',
  images: '.reading-detail .page-chapter img',
  Referer: 'http://www.nettruyenvip.com/'
}

module.exports = async (story, source, order) => {
  try {
    const Leech = new crawlController()
    const chapter = await Leech.store.exist(source).chapter()
    if (!chapter) {
      const chapterHTML = await Leech.getSite(source)
      if (chapterHTML) {
        Leech.load(chapterHTML)
        const name = Leech.getText(selector.name)
          .single()
          .replace(/^-/, '')
          .trim()
        console.log(name)
        if (name) {
          // lấy list image và build thành link
          const listImages = Leech.getAttr(selector.images, 'src')
            .array()
            .map((value) => 'http:' + value)

          if (listImages.length) {
            const content = await Leech.downloadListContent(listImages, story, {
              Referer: selector.Referer
            })
            await Leech.store.insertChapter(
              story._id,
              name,
              '',
              content,
              order,
              source
            )
            console.log('Created', name, content.length)
          }
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
