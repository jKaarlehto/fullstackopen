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
		return blogs > max.blogs ? {author, blogs} : max;
	    },{blogs:0})
    return highest 

}

module.exports = { totalLikes, dummy, favoriteBlog, mostBlogs }

