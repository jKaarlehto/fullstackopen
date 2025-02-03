const { PORT } = require('./config')

const Blog = require('../models/blog')

const dummy = () => 1

const notesInDb = async () => {

    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
    
    }

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

const mostBlogs = (blogs) => {

    if (blogs.length === 0) return null
    let counts = blogs
	    .map(blog => blog.author)
	    .reduce((counts, author) => {
		counts[author] = (counts[author] || 0) + 1;
		return counts
	    },{})
    let highest = Object.entries(counts)
	    .reduce((max, [author, blogs]) => {
		return blogs > max.blogs ? {author, blogs} : max
	    },{blogs:0})
    return highest 

}

const mostLikes = (blogs) => {

  if (blogs.length === 0) return null
  let likes = blogs
	.reduce((likes,blog) => {
	likes[blog.author] = (likes[blog.author] || 0) + blog.likes	
	return likes
	},{})
  let mostLiked = Object.entries(likes)
	.reduce((max, [author, likes]) => {
	    return likes > max.likes ? {author, likes} : max
	},{likes:0})
  return mostLiked 

}
module.exports = { totalLikes, dummy, favoriteBlog, mostBlogs, mostLikes, notesInDb}

