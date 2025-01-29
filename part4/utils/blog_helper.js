Blog = require('../models/blog')

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
	let likes = Number(blog.likes)
	sum += likes
    },0)
}

module.exports = {totalLikes}
    
