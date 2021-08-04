const cheerio = require('cheerio')

const BaseController = require('../../controller/studio.controller')
const axios = require('axios')

class Index extends BaseController {
  /**
   * _id = 0 là user admin mặc định
   */
  constructor() {
    super({ _id: 0 })
  }

  static async getSite(url, headers = {}) {
    try {
      const { data } = await axios.get(url, {
        headers
      })
      return data
    } catch (e) {
      return ''
    }
  }

  load(source) {
    this.$ = cheerio.load(source)
  }

  getAttr(selector, attr) {
    return {
      /**
       * @returns {[ String ]}
       */
      array: () => {
        const list = []
        for (const link of this.$(selector)) {
          list.push(
            this.$(link)
              .attr(attr || 'href')
              .trim()
          )
        }
        return list
      },
      single: () => {
        return this.$(selector)
          .attr(attr || 'href')
          .trim()
      }
    }
  }

  getText(selector) {
    return this.$(selector).text()?.trim()
  }

  /**
   * @param { [String] } array
   */
  listToContent(array) {
    return array.map((value) => {
      return {
        content: value
      }
    })
  }

  _makeChapterContent(raw) {
    return raw
  }
}

module.exports = Index
