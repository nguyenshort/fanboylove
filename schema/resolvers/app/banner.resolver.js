const BannerController = require('../../../controller/banner.controller')

module.exports = {
  Query: {
    appGetBanner: async () => {
      return BannerController.getBanner()
    }
  }
}
