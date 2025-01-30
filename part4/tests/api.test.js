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

})


after(async () => {
    await mongoose.connection.close()
})
