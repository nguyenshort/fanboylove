const crawlController = require('../index')

const selector = {
  site: 'https://mangaxy.com/',
  stories: '.list .truyen a.tipsy',
  avatar: '.detail-top-wrap .detail-top .big-img',
  title: '.detail-top-left .comics-title',
  team: '.manga-info ul li:nth-child(3) a',
  content: '.manga-info p',
  category: '.top-comics-type > a',
  Referer: 'https://mangaxy.com/',
  chapters: '.episodes-wrap.matrix .episode-item',
  name: '#chapnum',
  nameExtend: '#chapname',
  images: '.page-chapter img'
}

module.exports = class MangaXY {
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
    return this.Leech.getAttr(selector.chapters, 'href').array()?.reverse()
  }

  async makeStory(create) {
    let story = await this.Leech.store.exist(this.source).story()
    if (!story && create) {
      let avatar = '/'
      const avatarLink = this.Leech.getAttr(selector.avatar, 'src').single()
      if (avatarLink) {
        avatar = await this.Leech.downloadAvatar('https:' + avatarLink, {
          Referer: selector.Referer
        })
      }
      const title = this.Leech.getText(selector.title)
        .single()
        .replace(/^\[.*]\s/, '')
      const team = this.Leech.getText(selector.team).array()?.join(', ')
      const content = this.Leech.getText(selector.content).single()
      const listcategory = this.Leech.getText(selector.category).array()
      const categories = await this.Leech.store.makeListCategories(listcategory)
      story = await this.Leech.store.insertStory(
        title,
        '',
        '',
        team,
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
      callback(chapters[i], check, i)
    }
  }

  async importChaptersShow(story, chapters) {
    for (let i = 0; i < chapters.length; i++) {
      const check = await this.Leech.store.exist(chapters[i]).chapter()
      if (!check) {
        await this.reInit(chapters[i])
        await this.importChapter(story, i)
      }
    }
  }

  async importChapter(story, order) {
    const name = this.Leech.getText(selector.name).single()
    const nameExtend = this.Leech.getText(selector.nameExtend).single()
    const content = this.Leech.getAttr(selector.images, 'src')
      .array()
      .map((value) => {
        return {
          content: value
        }
      })
    if (name && content.length) {
      await this.Leech.store.insertChapter(
        story,
        name,
        nameExtend,
        content,
        order,
        this.source
      )
    }
  }
}
