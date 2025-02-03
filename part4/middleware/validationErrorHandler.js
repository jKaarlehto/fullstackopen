const logger = require('../utils/logger')
const ErrorHandler = (error, request, response, next) => {
   logger.error('Error logger:')
   logger.error(error) 

    if (error.name === 'ValidationError') {
	return response.status(400).json({error: `${error.message}`})
    } 

    next()

}

module.exports = ErrorHandler
