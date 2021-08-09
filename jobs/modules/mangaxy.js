const CronJob = require('cron').CronJob
const mangaXY = require('../../modules/crawl/site/mangaxy')
const Event = require('../../events')

const SITE = 'https://mangaxy.com/'
module.exports = new CronJob(
  '0 */15 * * * *',
  async () => {
    const Manga = new mangaXY(SITE)
    await Manga.init()
    const stories = Manga.stories()
    for (const source of stories.slice(0, 5)) {
      // load lại Leech
      await Manga.reInit(source)
      const chapters = Manga.chapters()
      if (chapters.length) {
        const story = await Manga.makeStory()
        if (story) {
          return Manga.importChapters(
            story,
            chapters,
            async (chapter, exist, index) => {
              if (!exist) {
                const deplay = new Promise((resolve) =>
                  setTimeout(() => {
                    Event.mangaXY(story, chapter, index)
                    resolve()
                  }, 500)
                )
                await deplay
              }
            }
          )
        }
      }
    }
  },
  null,
  true,
  'Asia/Ho_Chi_Minh'
)
