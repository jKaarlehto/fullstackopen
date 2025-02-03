const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const requresterExtractor = async (request, response, next) => {

	const authorization = request.get('authorization')
	if (!request.token && !authorization) {
	    next()
	    return
	}

	const decodedToken = jwt.verify(request.token,process.env.SECRET)	
	if (!decodedToken.id) {
	    return response.status(401).json({error: 'token invalid' })
	}
	request.requester = decodedToken.id
	next()
}

module.exports = requresterExtractor

