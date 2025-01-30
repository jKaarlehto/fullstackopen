const {test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const app = require('./../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const testVars = require('./test_vars')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = testVars.manyBlogsArr
	.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


describe('api', () => {

    test('response is json', async () => {
	await api
	    .get('/api/blogs')
	    .expect(201)
	    .expect('Content-Type', /application\/json/)
    })

    test('response identifier is id, not _id', async () => {

	const checkId = ({body}) => {
	    if (!(body[0].id)) throw new Error("no id")
	    if (body[0]._id) throw new Error("response should have id, not _id")
	}

	await api
	    .get('/api/blogs')
	    .expect(checkId)
    })

})


after(async () => {
    await mongoose.connection.close()
})
