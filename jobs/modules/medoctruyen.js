const CronJob = require('cron').CronJob
const meDocTruyen = require('../../modules/crawl/site/medoctruyen')

const SITE = 'https://www.medoctruyentranh.net/tim-truyen/dam-my/'
module.exports = new CronJob(
  '0 */10 * * * *',
  async () => {
    const MeDocTruyen = new meDocTruyen(SITE)
    await MeDocTruyen.init()
    const stories = MeDocTruyen.stories()
    const list = []
    for (const source of stories.slice(0, 5)) {
      // load lại Leech
      list.push(
        new Promise(async (resolve) => {
          const Leech = new meDocTruyen(source)
          await Leech.init()
          const chapters = Leech.chapters()
          if (chapters.length) {
            const story = await Leech.makeStory()
            if (story) {
              await Leech.importChaptersShow(story, chapters)
            }
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
