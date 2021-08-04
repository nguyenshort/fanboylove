const { v4: uuidv4 } = require('uuid')
const bunnycdn = require('../modules/bunnyCDN')
const Event = require('../events')
const sharp = require('sharp')

async function resizeImage(file, width, height) {
  return await sharp(file.path)
    .resize(width, height, { fit: 'cover' })
    .toBuffer()
}

module.exports.uploadSingle = async (req, res, next) => {
  if (!req.file) {
    throw new Error('File not found')
  }
  const path = req.body.pathName || req.file.path
  try {
    let image
    let securePath
    if (path.match('user/[0-9]*/avatar')) {
      // user avatar
      image = await resizeImage(req.file, 150, 150)
      securePath = false
    } else if (path.match('user/[0-9]*/banner')) {
      // user banner
      image = await resizeImage(req.file, 980)
      securePath = false
    } else if (path.match('story/[0-9]*/avatar') || path === 'temp/story') {
      // ảnh bìa truyện
      image = await resizeImage(req.file, 300, 400)
    } else if (path.match('chapters/avatar')) {
      // ảnh bìa chương truyện
      image = await resizeImage(req.file, 500, 312)
      securePath = false
    } else if (path.match('chapters/content')) {
      // nội dung chap
      image = await resizeImage(req.file, 800)
      securePath = true
    } else if (path.match('banners')) {
      // bình luận
      securePath = false
      image = await resizeImage(req.file, 800)
    } else {
      // các hình còn lại
      securePath = false
      image = await resizeImage(req.file, 300)
    }
    let path1 = '/' + path + '/' + uuidv4() + '.jpg'
    const BunnyCDN = new bunnycdn(securePath)
    await BunnyCDN.upload(image, path1)
    Event.removeFile(req.file.path)
    return res.status(200).json({
      msg: 'Thành công',
      success: true,
      data: bunnycdn.webAssets(path1, securePath)
    })
  } catch (e) {
    Event.removeFile(req.file.path)
    return res.status(500)
  }
}
