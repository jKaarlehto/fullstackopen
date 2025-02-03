const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const app = require('./../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const testVars = require('./test_vars')

const api = supertest(app)

const INITIAL_COUNT = testVars.manyBlogsArr.length

beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjects = testVars.manyBlogsArr
		.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})


const validateBlog = async ({body}) => {
    await Blog.validate(body)
}


describe('API', () => {

	describe('GET', () => {

		test('response is json', async () => {
			await api
				.get('/api/blogs')
				.expect(201)
				.expect('Content-Type', /application\/json/)
		})

		test('response identifier is id, not _id', async () => {

			const checkId = ({ body }) => {
				if (!(body[0].id)) throw new Error("no id")
				if (body[0]._id) throw new Error("response should have id, not _id")
			}

			await api
				.get('/api/blogs')
				.expect(checkId)
		})

		test('getting an blog by id yields a valid blog object', async() => {

		    //set in initial state
		    const existingId = testVars.manyBlogsArr[0]._id


		    await api
			.get(`/api/blogs/${existingId}`)
			.expect(200)
			.expect(validateBlog)

		})
	})

	describe('POST', () => {

		test('posting a blog adds it to the database', async () => {

			const body = testVars.oneBlogArr[0]
			await api
				.post('/api/blogs')
				.send(body)
				.set('Content-Type', 'application/json')
				.expect(201)
			await api
				.get('/api/blogs')
				.expect(({ body }) => {
					assert.equal(body.length, INITIAL_COUNT + 1)
				})
		})

		test('posting a blog without likes sets likes to 0', async () => {

			const body = testVars.zeroLikeBlogArr[0]
			const response = await api
				.post('/api/blogs')
				.send(body)
				.set('Content-Type', 'application/json')
				.expect(201)

			assert.equal(response.body.likes, 0)

		})

		test('posting a blog without required fields yields 400', async () => {

			const body = testVars.malformedBlogArr[0]
			const response = await api
				.post('/api/blogs')
				.send(body)
				.set('Content-Type', 'application/json')
				.expect(400)
		})

	})

	describe('DELETE', () => {

		test('deleting a blog removes it from the database', async () => {

			const body = testVars.oneBlogArr[0]
			const response = await api
				.post('/api/blogs')
				.send(body)
				.set('Content-Type', 'application/json')
				.expect(201)
			await api
				.get('/api/blogs')
				.expect(({ body }) => {
					assert.equal(body.length, INITIAL_COUNT + 1)
				})

			await api
				.delete(`/api/blogs/${response.body.id}`)
				.expect(204)

			await api
				.get('/api/blogs')
				.expect(({ body }) => {
					assert.equal(body.length, INITIAL_COUNT)
				})
		})

		test('deleting deleting a non-existent id yields 404', async () => {


			const body = testVars.oneBlogArr[0]
			const response = await api
				.post('/api/blogs')
				.send(body)
				.set('Content-Type', 'application/json')
				.expect(201)
			await api
				.get('/api/blogs')
				.expect(({ body }) => {
					assert.equal(body.length, INITIAL_COUNT + 1)
				})

			await api
				.delete(`/api/blogs/${response.body.id}`)
				.expect(204)

			await api
				.delete(`/api/blogs/${response.body.id}`)
				.expect(404)
		})

	})


	describe('PUT' , () => {

	    test('updating a document changes its contents', async () => {

		//set in initial state
		const existingId = testVars.manyBlogsArr[0]._id
		const updatedBlog = testVars.oneBlogArr[0] 
		delete updatedBlog._id

		await api
		    .put(`/api/blogs/${existingId}`)
		    .send(updatedBlog)
		    .set('Content-Type', 'application/json')
		    .expect(200)
		    .expect(validateBlog)
	    })

	    test('malformed update yields 400', async () => {

		//set in initial state
		const existingId = testVars.manyBlogsArr[0]._id
		const updatedBlog = { laa : '5a422a851b54a676234d17f8'}

		await api
		    .put(`/api/blogs/${existingId}`)
		    .send(updatedBlog)
		    .set('Content-Type', 'application/json')
		    .expect(400)
	    })

	})

})


after(async () => {
	await mongoose.connection.close()
})
