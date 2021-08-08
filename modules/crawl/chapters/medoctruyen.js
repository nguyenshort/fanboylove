const crawlController = require('../index')
const selector = {
  data: '#__NEXT_DATA__',
  Referer: 'https://www.medoctruyentranh.net/'
}

module.exports = async (story, source) => {
  try {
    console.log('Chapter raw:', source)
    const Leech = new crawlController()
    const HTML = await Leech.getSite(source)
    if (HTML) {
      Leech.load(HTML)
      const data = Leech.getHTML(selector.data).single()
      if (data) {
        const {
          props: {
            pageProps: {
              initialState: {
                read: { detail_item }
              }
            }
          }
        } = JSON.parse(data)
        const { chapter_title, chapter_index, elements } = detail_item
        const content = elements.map((value) => {
          return {
            content: value.content
          }
        })
        await Leech.store.insertChapter(
          story._id,
          chapter_title,
          '',
          content,
          chapter_index,
          source
        )
        console.log('Created Chapter', chapter_title)
      }
    }
  } catch (e) {
    console.log('Error Chapter', source)
  }
}
