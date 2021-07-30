const express = require('express')
const router = express.Router()

const storyController = require('../controller/story.controller')
const categoryController = require('../controller/category.controller')
const authController = require('../controller/auth.controller')
const BunnyCDN = require('../mixins/bunnyCDN')

router.get('/stories', async ({ query }, res, next) => {
  try {
    const StoryController = new storyController()
    const stories = await StoryController.getManyWithChapter(
      query.order,
      parseInt(query.page) || 0,
      parseInt(query.limit) || 1,
      2
    )
    Object.values(stories).map((value) => {
      value.story.avatar = BunnyCDN.webAssets(value.story.avatar)
      return value
    })
    res.send(stories)
  } catch (e) {
    console.log(e)
    return res.status(500).send('Fanboylove api busy times')
  }
})

router.get('/stories/related', async ({ query }, res) => {
  try {
    const StoryController = new storyController()
    const stories = await StoryController.getMany(
      query.order,
      parseInt(query.page) || 0,
      parseInt(query.limit) || 1
    )
    Object.values(stories).map((value) => {
      value.avatar = BunnyCDN.webAssets(value.avatar)
      return value
    })
    res.send(stories)
  } catch (e) {
    return res.status(500).send('Fanboylove api busy times')
  }
})

router.get('/search', async ({ query }, res, next) => {
  if (!query.keyword) {
    return res.send([])
  }
  try {
    const StoryController = new storyController()
    const stories = await StoryController.search(
      query.keyword,
      parseInt(query.page) || 0,
      parseInt(query.limit) || 1
    )
    Object.values(stories).map((value) => {
      value.story.avatar = BunnyCDN.webAssets(value.story.avatar)
      return value
    })
    res.send(stories)
  } catch (e) {
    return res.status(500).send('Fanboylove api busy times')
  }
})

router.get('/quick-search', async ({ query }, res, next) => {
  if (!query.keyword) {
    return res.send([])
  }
  try {
    const StoryController = new storyController()
    const stories = await StoryController.quickSearch(query.keyword, 5)
    Object.values(stories).map((value) => {
      value.avatar = BunnyCDN.webAssets(value.avatar)
      return value
    })
    res.send(stories)
  } catch (e) {
    console.log(e)
    return res.status(500).send('Fanboylove api busy times')
  }
})

router.get('/category/:id/stories', async ({ params, query }, res) => {
  try {
    const CategoryController = new categoryController()
    const category = await CategoryController.getOne(parseInt(params.id))
    if (!category) {
      return res.status(404).send('Category không tồn tại')
    }
    const stories = await CategoryController.categoryGetBooks(
      category._id,
      params.order || 'updatedAt',
      parseInt(query.page) || 0,
      parseInt(query.limit) || 1
    )
    Object.values(stories).map((value) => {
      value.story.avatar = BunnyCDN.webAssets(value.story.avatar)
      return value
    })
    res.send(stories)
  } catch (e) {
    return res.status(500).send('Fanboylove api busy times')
  }
})

router.post('/login', async ({ body }, res) => {
  if (!body.email || !body.password) {
    return res.status(401).send('Nhập mật khẩu không đúng')
  }
  const AuthController = new authController()
  try {
    const data = await AuthController.login(body.email, body.password)
    return res.send(data)
  } catch ({ message }) {
    return res.status(401).send(message)
  }
})

router.post('/sign-up', async ({ body }, res) => {
  if (!body.email || !body.password || !body.name) {
    return res.status(401).send('Nhập mật khẩu không đúng')
  }
  const AuthController = new authController()
  try {
    const data = await AuthController.signup(
      body.name,
      body.email,
      body.password
    )
    return res.send(data)
  } catch ({ message }) {
    return res.status(401).send(message)
  }
})

module.exports = router
