const router = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')
const User = require('../models/user')

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
	const creator = await User.findOne({})
	let blog = {...request.body, user:creator.id}
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
