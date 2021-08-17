const sharp = require('sharp')
module.exports = async (inputBuffer, width, height) => {
  return sharp(inputBuffer).jpeg({}).resize(width, height, { fit: 'cover' }).toBuffer()
}
