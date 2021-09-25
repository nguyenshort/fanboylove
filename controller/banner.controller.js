const Banner = require('../models/Banner')

module.exports = class {
  static async getBanner() {
    return Banner.find()
  }
}
