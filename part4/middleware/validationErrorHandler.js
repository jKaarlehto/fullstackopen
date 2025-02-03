const validationErrorHandler = (error, request, response, next) => {

    if (error.name === 'ValidationError') {
	response.status(400).json({error: `${error.message}`})
    } else next()

}

module.exports = validationErrorHandler
