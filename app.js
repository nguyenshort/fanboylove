require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const rateLimit = require('express-rate-limit')

const apolloServer = require('./schema')

const app = express()

app.set('trust proxy', 1)
const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 15 hour window
  max: 20, // start blocking after 5 requests
  message: 'Fanboylove api busy times'
})

//  apply to all requests
app.use(limiter)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

apolloServer.applyMiddleware({ app })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const homeRouter = require('./routes/index')
const storyRouter = require('./routes/story')
const categoryRouter = require('./routes/category')
const aboutRoutes = require('./routes/about')

const uploadRoutes = require('./routes/upload')
const siteMapRoutes = require('./routes/sitemap')
const apiRouter = require('./routes/api')

app.use('/sitemap', siteMapRoutes)

const sideBar = require('./utilities/sidebar')
const authRoutes = require('./utilities/auth')

app.use(sideBar)
app.use(authRoutes)

app.use(uploadRoutes)

app.use(homeRouter)
app.use(storyRouter)
app.use(categoryRouter)
app.use(aboutRoutes)

app.use('/api', apiRouter)

app.use(function (req, res) {
  return res.status(404).render('error')
})

// require('./jobs')
module.exports = app
