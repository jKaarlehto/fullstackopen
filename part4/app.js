const config = require('./utils/config')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const router = require('./controllers/router')
const logger = require('./utils/logger')

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
app.use('/api', router)

module.exports = app
