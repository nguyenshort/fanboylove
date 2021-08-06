const crawlController = require('../../modules/crawl')

const selector = {
  name: '.reading .top .txt-primary span',
  images: '.reading-detail .page-chapter img',
  Referer: 'http://www.nettruyenvip.com/'
}

module.exports = async (story, source, order) => {
  try {
    const Leech = new crawlController()
    const chapterHTML = await Leech.getSite(source)
    if (chapterHTML) {
      Leech.load(chapterHTML)
      const name = Leech.getText(selector.name)
        .single()
        .replace(/^-/, '')
        .trim()
      if (name) {
        // lấy list image và build thành link
        const listImages = Leech.getAttr(selector.images, 'src')
          .array()
          .map((value) => 'http:' + value)

        if (listImages.length) {
          const content = await Leech.downloadListContent(listImages, story, {
            Referer: selector.Referer
          })
          if (content.length) {
            await Leech.store.insertChapter(
              story._id,
              name,
              '',
              content,
              order,
              source
            )
            console.log('Created', name)
          }
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
