const { test, describe } = require('node:test')
const assert = require('node:assert')
const blogHelper = require('../utils/blog_helper')
const { on } = require('node:events')

test.describe('total likes', () => {
	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		}
	]
	
	test('when list only contains one blog b ==> total likes = b.likes'), () => {
	    const result = blogHelper.totalLikes(listWithOneBlog)
	    assert.strictEqual(result,5)
	}

})

