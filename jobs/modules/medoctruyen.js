const CronJob = require('cron').CronJob
const meDocTruyen = require('../../modules/crawl/site/medoctruyen')
const Event = require('../../events')

const SITE = 'https://www.medoctruyentranh.net/tim-truyen/dam-my/'
module.exports = new CronJob(
  '0 */10 * * * *',
  async () => {
    const MeDocTruyen = new meDocTruyen(SITE)
    await MeDocTruyen.init()
    const stories = MeDocTruyen.stories()
    for (const source of stories.slice(0, 5)) {
      // load lại Leech
      await MeDocTruyen.reInit(source)
      const chapters = MeDocTruyen.chapters()
      if (chapters.length) {
        const story = await MeDocTruyen.makeStory()
        if (story) {
          await MeDocTruyen.importChaptersShow(story, chapters)
          /*return MeDocTruyen.importChapters(
            story,
            chapters,
            async (chapter, exist) => {
              if (!exist) {
                const deplay = new Promise((resolve) =>
                  setTimeout(() => {
                    Event.medoctruyen(story, chapter)
                    resolve()
                  }, 500)
                )
                await deplay
              }
            }
          )*/
        }
      }
    }
  },
  null,
  true,
  'Asia/Ho_Chi_Minh'
)
