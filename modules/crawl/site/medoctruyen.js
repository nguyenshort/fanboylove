const crawlController = require('../index')
const Event = require('../../../events')

const selector = {
  site: 'https://www.medoctruyentranh.net/tim-truyen/dam-my',
  stories: '.classifyList > a',
  avatar: '.detail_info img',
  title: '.detail_infos .title',
  team: '#title + .other_infos > div:last-child font',
  author: '#title + .other_infos > div:first-child font',
  content: '.other_infos .summary',
  category: '.detail_infos .other_infos > div a',
  Referer: 'https://www.medoctruyentranh.net/',
  data: '#__NEXT_DATA__',
  chapters: '.chapters a'
}

module.exports = class MeDocTruyen {
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
    return this.Leech.getAttr(selector.chapters, 'href').array()
  }

  async makeStory(create) {
    let story = await this.Leech.store.exist(this.source).story()
    if (!story && create) {
      // avatar mặc định
      let avatar = '/'
      const avatarLink = this.Leech.getAttr(selector.avatar, 'src').single()
      if (avatarLink) {
        avatar = await this.Leech.downloadAvatar('http:' + avatarLink, {
          Referer: selector.Referer
        })
      }
      const title = this.Leech.getText(selector.title).single()
      const team = this.Leech.getText(selector.team).single()
      const author = this.Leech.getText(selector.author).single()
      const content = this.Leech.getText(selector.content)
        .single()
        ?.replace('Xem thêm', '')
        ?.trim()
      const listcategory = this.Leech.getText(selector.category).array()
      const categories = await this.Leech.store.makeListCategories(listcategory)
      story = await this.Leech.store.insertStory(
        title,
        '',
        author,
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
    for (const chapter of chapters) {
      const check = await this.Leech.store.exist(chapter).chapter()
      callback(chapter, check)
    }
  }

  async importChaptersShow(story, chapters) {
    for (const chapter of chapters) {
      const check = await this.Leech.store.exist(chapter).chapter()
      if (!check) {
        await this.reInit(chapter)
        await this.importChapter(story)
      }
    }
  }

  async importChapter(story) {
    const data = this.Leech.getHTML(selector.data).single()
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
      if (elements.length) {
        elements.map((value) => value.content)
        const content = await this.Leech.downloadListContent(elements, story, {
          Referer: selector.Referer
        })
        if (content.length) {
          await this.Leech.store.insertChapter(
            story._id,
            chapter_title,
            '',
            content,
            chapter_index,
            this.source
          )
        }
      }
    }
  }
}
