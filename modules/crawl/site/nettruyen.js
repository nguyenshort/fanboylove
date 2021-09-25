const crawlController = require('../index')

const selector = {
  chapters: '#item-detail .chapter a',
  avatar: '.col-image img',
  Referer: 'http://www.nettruyenpro.com/',
  title: '#item-detail h1.title-detail',
  content: '.detail-content p',
  categories: '.list-info .kind .col-xs-8 a',
  author: '.list-info .author .col-xs-8',
  site: 'http://www.nettruyenpro.com/tim-truyen/dam-my',
  stories: '.items .item .image a',

  name: '.reading .top .txt-primary span',
  images: '.reading-detail .page-chapter img'
}

module.exports = class NetTruyen {
  constructor(source) {
    this.Leech = new crawlController()
    this.source = source
  }

  async init() {
    const HTML = await this.Leech.getSite(this.source)
    return this.Leech.load(HTML)
  }

  async reInit(source) {
    this.source = source
    await this.init()
  }

  stories() {
    return this.Leech.getAttr(selector.stories, 'href').array()
  }

  chapters() {
    return this.Leech.getAttr(selector.chapters, 'href').array().reverse()
  }

  async makeStory() {
    let story = await this.Leech.store.exist(this.source).story()
    if (!story) {
      const title = this.Leech.getText(selector.title).single()
      // avatar mặc định
      let avatar = '/'
      const avatarLink = this.Leech.getAttr(selector.avatar, 'src').single()
      if (avatarLink) {
        avatar = await this.Leech.downloadAvatar(
          /^(http|https)/.test(avatarLink) ? avatarLink : 'http:' + value,
          {
            Referer: selector.Referer
          }
        )
      }
      const content = this.Leech.getText(selector.content).single()
      const listCate = this.Leech.getText(selector.categories).array()
      const categories = await this.Leech.store.makeListCategories(listCate)
      const author = this.Leech.getText(selector.author).single()
      story = await this.Leech.store.insertStory(
        title,
        '',
        author,
        '',
        avatar,
        content,
        categories,
        this.source
      )
    }
    return story
  }

  async importChapters(story, chapters, callback) {
    for (let i = 0; i < chapters.length; i++) {
      const check = await this.Leech.store.exist(chapters[i]).chapter()
      if (!check) {
        callback(chapters[i], i)
      }
    }
  }

  /**
   * Update sử dụng promise để tăng tốc leech
   * @param story
   * @param chapters
   * @returns {Promise<void>}
   */
  async importChaptersShow(story, chapters) {
    let list = []
    for (let i = 0; i < chapters.length; i++) {
      const check = await this.Leech.store.exist(chapters[i]).chapter()
      if (!check) {
        if (i % 10 !== 0) {
          list.push(
            new Promise(async (resolve) => {
              const leech = new NetTruyen(chapters[i])
              await leech.init()
              await leech.importChapter(story, i)
              resolve()
            })
          )
        } else if (list.length) {
          await Promise.all(list)
          list = []
        }
      }
    }
  }

  async importChapter(story, order) {
    const name = this.Leech.getText(selector.name).single().replace(/^-/, '').trim()
    if (name) {
      // lấy list image và build thành link
      const listImages = this.Leech.getAttr(selector.images, 'src')
        .array()
        .map((value) => (/^(http|https)/.test(value) ? value : 'http:' + value))
      if (listImages.length) {
        const content = await this.Leech.downloadListContent(listImages, story, {
          Referer: selector.Referer
        })
        if (content.length) {
          try {
            return this.Leech.store.insertChapter(story._id, name, '', content, order, this.source)
          } catch (e) {
            console.log(e)
            await this.Leech.cloud.removeMany(content)
          }
        }
      }
    }
  }
}
