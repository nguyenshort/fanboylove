const axios = require('axios')
const cheerio = require('cheerio')
module.exports = class {
  async getSite(url, headers = {}) {
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
    return {
      single: () => this.$(selector).text()?.trim(),
      array: () => {
        const list = []
        for (const link of this.$(selector)) {
          list.push(this.$(link).text()?.trim())
        }
        return list
      }
    }
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
}
