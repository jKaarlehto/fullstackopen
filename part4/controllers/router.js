const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

router.post('/blogs', (request, response) => {
  console.log(request.body)
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


module.exports = router 
