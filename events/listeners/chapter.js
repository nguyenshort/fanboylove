const bunnyCDN = require('../../modules/bunnyCDN')

/**
 * @param { [ { content: String } ] } content
 */
module.exports.clearChapter = async (content) => {
  try {
    const BunnyCDN = new bunnyCDN(true)
    const list = []
    for (const image of content) {
      list.push(
        new Promise(() => {
          BunnyCDN.remove(image.content)
        })
      )
    }
    await Promise.all(list)
  } catch (e) {}
}

/**
 * @param { [ { content: String } ] } content
 * @param { Number } _id
 * @param { [ { content: String } ] } oldContent
 */
module.exports.updateChapter = async (_id, oldContent, content) => {
  const BunnyCDN = new bunnyCDN(true)
  const list = []
  for (const image of oldContent) {
    const exist =
      content.findIndex((value) => value.content === image.content) > -1
    if (!exist) {
      list.push(
        new Promise(() => {
          BunnyCDN.remove(image.content)
        })
      )
    }
  }
  await Promise.all(list)
}
