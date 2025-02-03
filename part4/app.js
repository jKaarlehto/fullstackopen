const config = require('./utils/config')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const tokenExtractor = require('./middleware/tokenExtractor')
const requresterExtractor = require('./middleware/requesterExtractor')

const blogRouter = require('./controllers/blogRouter')
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/loginRouter')
const logger = require('./utils/logger')
const errorHandler = require('./middleware/errorHandler')

mongoose.connect(config.MONGODB_URI, {dbName:config.MONGODB_DBNAME})
    .then(() => {
	logger.info(`MongoDB connected to: ${config.MONGODB_URI}`)
    })
    .catch(error => {
	logger.error(error)
    })

const app = express()

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)



//Error handler
app.use(errorHandler)

module.exports = app
