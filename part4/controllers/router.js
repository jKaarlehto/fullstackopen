const router = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')

router.get('/blogs', async (request, response) => {
    const result = await Blog.find({})
    response.status(201).json(result)
    })

router.post('/blogs', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})


module.exports = router 
