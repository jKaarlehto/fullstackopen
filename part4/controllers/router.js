const router = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')

router.get('/blogs', async (request, response) => {
	const result = await Blog.find({})
	response.status(201).json(result)
})

router.get('/blogs/:id', async (request, response) => {
	const result = await Blog.findById(request.params.id)
	if (!(result)) { response.status(404).end() }
	else { response.status(200).json(result) }
})

router.post('/blogs', async (request, response) => {
	const blog = new Blog(request.body)
	const result = await blog.save()
	response.status(201).json(result)
})

router.delete('/blogs/:id', async (request, response) => {
	const result = await Blog.findByIdAndDelete(request.params.id)
	if (!(result)) { response.status(404).end() }
	else { response.status(204).end() }
	})

router.put('/blogs/:id', async (request,response) => {

    await Blog.validate(request.body)
    const result = await Blog
	.findByIdAndUpdate(
	    request.params.id,
	    request.body,
	    {returnDocument: 'after', new:true, runValidators: true, context: 'query'}
	)
    
    response.status(200).json(result)
    console.log(`updated doc: ${response}`)

})


module.exports = router 
