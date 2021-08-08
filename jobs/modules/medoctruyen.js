const CronJob = require('cron').CronJob

const MeDocTruyen = require('../../modules/crawl/site/medoctruyen')
module.exports.medoctruyen = new CronJob(
  '0 08 * * * *',
  MeDocTruyen,
  null,
  true,
  'Asia/Ho_Chi_Minh'
)
