const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const uploadController = require('../controller/upload.Controller')

router.post(
  '/upload/single',
  upload.single('image'),
  uploadController.uploadSingle
)

module.exports = router
