const logger = require('../utils/logger')
const ErrorHandler = (error, request, response, next) => {
	
	logger.error(error)
	if (error.name === 'ValidationError') {
		return response.status(400).json({ error: `${error.message}` })
	} else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
		return response.status(400).json({ error: 'expected `username` to be unique' })
	} else if (error.name ===  'JsonWebTokenError') {
	    return response.status(400).json({ error: 'token missing or invalid' })
	} else if (error.name ===  'JsonWebTokenError') {
	    return response.status(400).json({ error: 'token missing or invalid' })
	  }
	next(error)

}

module.exports = ErrorHandler
