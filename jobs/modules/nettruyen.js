const CronJob = require('cron').CronJob

const NetTruyen = require('../../modules/crawl/site/nettruyen')

module.exports = new CronJob(
  '0 */30 * * * *',
  NetTruyen,
  null,
  true,
  'Asia/Ho_Chi_Minh'
)
