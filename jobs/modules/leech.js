const CronJob = require('cron').CronJob

const NetTruyen = require('../../modules/crawl/site/nettruyen')

module.exports.nettruyen = new CronJob(
  '0 */30 * * * *',
  NetTruyen,
  null,
  true,
  'Asia/Ho_Chi_Minh'
)

const MeDocTruyen = require('../../modules/crawl/site/medoctruyen')
module.exports.medoctruyen = new CronJob(
  '0 */15 * * * *',
  MeDocTruyen,
  null,
  true,
  'Asia/Ho_Chi_Minh'
)
