const CronJob = require('cron').CronJob

const netTruyen = require('../../modules/crawl/site/nettruyen')
const Event = require('../../events')

const SITE = 'http://www.nettruyenvip.com/tim-truyen/dam-my'

module.exports = new CronJob(
  '0 */20 * * * *',
  async () => {
    const NetTruyen = new netTruyen(SITE)
    await NetTruyen.init()
    const stories = NetTruyen.stories()
    for (const source of stories.slice(0, 4)) {
      // load lại Leech
      await NetTruyen.reInit(source)
      const chapters = NetTruyen.chapters()
      if (chapters.length) {
        const story = await NetTruyen.makeStory()
        await NetTruyen.importChapters(
          story,
          chapters,
          async (chapter, exist, index) => {
            if (!exist) {
              const deplay = new Promise((resolve) =>
                setTimeout(() => {
                  Event.nettruyen(story, chapter, index)
                  resolve()
                }, 5000)
              )
              await deplay
            }
          }
        )
      }
    }
  },
  null,
  true,
  'Asia/Ho_Chi_Minh'
)
