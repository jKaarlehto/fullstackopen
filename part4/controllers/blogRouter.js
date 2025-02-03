const router = require('express').Router()
const jwt = require('jsonwebtoken')
require('express-async-errors')
const Blog = require('../models/blog')
const User = require('../models/user')
const { PORT } = require('../utils/config')


getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
	return authorization.replace('Bearer ', '')
    }
    return null
}

router.get('/', async (request, response) => {
	const result = await Blog.find({}).populate('user')
	response.status(201).json(result)
})

router.get('/:id', async (request, response) => {
	const result = await Blog.findById(request.params.id)
	if (!(result)) { response.status(404).end() }
	else { response.status(200).json(result) }
})

router.post('/', async (request, response) => {
	if (!request.requester) {
	   return response.status(401).json({error: 'Unauthorized: not authenticated'})
	}
	const requester = request.requester
	
	let blog = {...request.body, user:requester}
	if (!blog.author) {
	    const author = await User.findById(requester).name
	    blog.author = author 
	}

	blog = new Blog(blog)
	const result = await blog.save()
	response.status(201).json(result)
})

router.delete('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id) 
	if (!blog) response.status(404).end()	

	const owner = blog.user.toString()

	if (!request.requester) {
	   return response.status(401).json({error: 'Unauthorized: not authenticated'})
	}
	if (!(request.requester === owner)) {
	    return response.status(401).json({error: `Unauthorized: user ${request.requester} does not own object ${request.params.id}`}) 
	}
	const result = await Blog.findByIdAndDelete(request.params.id)
	if (!(result)) { response.status(404).end() }
	else { response.status(204).end() }
	})

router.put('/:id', async (request,response) => {

    await Blog.validate(request.body)
    const result = await Blog
	.findByIdAndUpdate(
	    request.params.id,
	    request.body,
	    {returnDocument: 'after', new:true, runValidators: true, context: 'query'}
	)
    response.status(200).json(result)
})


module.exports = router 
