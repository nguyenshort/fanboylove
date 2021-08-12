const CronJob = require('cron').CronJob

const netTruyen = require('../../modules/crawl/site/nettruyen')
// const Event = require('../../events')

const SITE = 'http://www.nettruyenvip.com/tim-truyen/dam-my'

module.exports = new CronJob(
  '0 */20 * * * *',
  async () => {
    const NetTruyen = new netTruyen(SITE)
    await NetTruyen.init()
    const stories = NetTruyen.stories()
    const list = []
    for (const source of stories.slice(0, 5)) {
      list.push(
        new Promise(async (resolve) => {
          const Leech = new netTruyen(source)
          await Leech.init()
          const chapters = Leech.chapters()
          if (chapters.length) {
            const story = await Leech.makeStory()
            await Leech.importChaptersShow(story, chapters)
          }
          resolve()
        })
      )
    }
    await Promise.all(list)
  },
  null,
  true,
  'Asia/Ho_Chi_Minh'
)

/*await NetTruyen.importChapters(
      story,
      chapters,
      async (chapter, index) => {
        const deplay = new Promise((resolve) =>
          setTimeout(() => {
            Event.nettruyen(story, chapter, index)
            resolve()
          }, 20000)
        )
        await deplay
      }
    )*/
