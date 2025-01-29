Blog = require('../models/blog')

const dummy = (dummy) => 1

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => {
		let likes = Number(blog.likes)
		return sum + likes
	}, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) return null
	return blogs.reduce((highest, blog) => {
		if (isNaN(blog.likes)) throw new Error(`likes should be a number. ${JSON.stringify(blog)}`);
		return blog.likes > highest.likes ? blog : highest;
	}, blogs[0]);
}

module.exports = { totalLikes, dummy, favoriteBlog }

