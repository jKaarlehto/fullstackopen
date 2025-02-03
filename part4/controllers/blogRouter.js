const router = require('express').Router()
const jwt = require('jsonwebtoken')
require('express-async-errors')
const Blog = require('../models/blog')
const User = require('../models/user')


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
	const decodedToken = jwt.verify(request.token,process.env.SECRET)	
	if (!decodedToken.id) {
	    return response.status(401).json({error: 'token invalid' })
	}
	const user = await User.findById(decodedToken.id)
	let blog = {...request.body, user:user.id}
	if (!blog.author) blog.author = user.name
	blog = new Blog(blog)
	console.log(blog)
	const result = await blog.save()
	response.status(201).json(result)
})

router.delete('/:id', async (request, response) => {
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
