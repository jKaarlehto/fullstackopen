const usersRouter = require('express').Router()
require('express-async-errors')
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body
	if (!(username) || username.length < 3) {
	    response.status(400).json({error: '`username` must be at least 3 characters long'})
	}
	if (!(password) || password.length < 3) {
	    response.status(400).json({error: '`password` must be at least 3 characters long'})
	}
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)
	const newUser = {username, name, passwordHash}
	const user = new User({newUser})
	const savedUser = await user.save()
	response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {

   const users = await User.find({})
    response.status(200).json(users)
})

module.exports = usersRouter
