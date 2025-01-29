const { test, describe } = require('node:test')
const assert = require('node:assert')
const testVars = require('./test_vars')
const blogHelper = require('../utils/blog_helper')


test('dummy returns one', () => {
	const blogs = []
	const result = blogHelper.dummy(blogs)
	assert.strictEqual(result, 1)
})

describe('total likes', () => {

	test('when list only contains one blog b ==> total likes = b.likes', () => {
		const result = blogHelper.totalLikes(testVars.oneBlogArr)
		assert.strictEqual(result, 5)
	})


})
describe('favorite blog', () => {

	test('is the blog with most likes', () => {
		const result = blogHelper.favoriteBlog(testVars.manyBlogsArr)
		answer =
		{
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0
		}
		assert.deepStrictEqual(result, answer)
	})

})
describe('most blog posts', () => {

	test('the author with most blog posts', () => {
		const result = blogHelper.mostBlogs(testVars.manyBlogsArr)
		answer =
		{
			author: "Robert C. Martin",
			blogs: 3
		}
		assert.deepStrictEqual(result, answer)
	})

})

