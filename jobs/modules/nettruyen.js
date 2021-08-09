const CronJob = require('cron').CronJob

const netTruyen = require('../../modules/crawl/site/nettruyen')

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
        await NetTruyen.importChapters(story, chapters)
      }
    }
  },
  null,
  true,
  'Asia/Ho_Chi_Minh'
)
