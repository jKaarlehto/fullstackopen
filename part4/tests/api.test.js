const { test, describe, beforeEach, before, after } = require('node:test')
const assert = require('node:assert')
const app = require('./../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const testVars = require('./test_vars')

const api = supertest(app)

const INITIAL_COUNT = testVars.manyBlogsArr.length

const validateBlog = async ({body}) => {
    await Blog.validate(body)
}

let token;
before( async () => {
    const creds = {username : testVars.testUser.username, password : testVars.testUser.password}
    const init = await api
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send(creds)
    console.log(init.body)

    const login = await api
	.post('/api/login')
	.set('Content-Type', 'application/json')
	.send(creds)
    console.log(login.body)
     token = `Bearer ${login.body.token}`
})

describe('api/blogs', () => {

beforeEach(async () => {
    await User.deleteMany({ username: { $ne: testVars.testUser.username } })
    await Blog.deleteMany({})
    const testUserId = await User.findOne({username: testVars.testUser.username})
    const blogObjects = testVars.manyBlogsArr
	.map(blog => ({...blog, user:testUserId}))
    await Blog.insertMany(blogObjects)
})


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
		
		test('posting a blog without token yields 401 and doesnt add it to db', async () => {


			const body = testVars.oneBlogArr[0]
			await api
				.post('/api/blogs')
				.set('Content-Type', 'application/json')
				.send(body)
				.expect(401)
			await api
				.get('/api/blogs')
				.expect(({ body }) => {
					assert.equal(body.length, INITIAL_COUNT )
				})
		})


		test('posting a blog adds it to the database', async () => {
			
			const body = testVars.oneBlogArr[0]
			await api
				.post('/api/blogs')
				.set('Content-Type', 'application/json')
				.set('Authorization', token)
				.send(body)
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
				.set('Authorization', token)
				.expect(201)

			assert.equal(response.body.likes, 0)

		})

		test('posting a blog without required fields yields 400', async () => {

			const body = testVars.malformedBlogArr[0]
			const response = await api
				.post('/api/blogs')
				.send(body)
				.set('Content-Type', 'application/json')
				.set('Authorization', token)
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
				.set('Authorization', token)
				.expect(201)
			await api
				.get('/api/blogs')
				.expect(({ body }) => {
					assert.equal(body.length, INITIAL_COUNT + 1)
				})

			await api
				.delete(`/api/blogs/${response.body.id}`)
				.set('Authorization', token)
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
				.set('Authorization', token)
				.expect(201)
			await api
				.get('/api/blogs')
				.expect(({ body }) => {
					assert.equal(body.length, INITIAL_COUNT + 1)
				})

			await api
				.delete(`/api/blogs/${response.body.id}`)
				.set('Authorization', token)
				.expect(204)

			await api
				.delete(`/api/blogs/${response.body.id}`)
				.set('Authorization', token)
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

describe( 'api/users', () => {

    beforeEach(async () => {
	await User.deleteMany({ username: { $ne: testVars.testUser.username } })
	const userObjects = testVars.manyUsersArr
	    .map(user => new User(user))
	const promiseArray = userObjects.map(user => user.save())
	await Promise.all(promiseArray)
    })

    describe('GET', () => { 

	test('returns json', async () => {
	    await api
		.get('/api/users')
		.expect('Content-Type', /application\/json/)
		})

	test('response length matches db user count', async () => {

	    await api
		.get('/api/users')
		.expect(({body}) => assert.equal(body.length, testVars.manyUsersArr.length +1)) // +1 for testUser 
		})
    })

    describe('POST', () => {

	test('users with missing username are not created', async () => {
	    await api
		.post('/api/users')
		.send(testVars.missingUsernameArr[0])
		.set('Content-Type', 'application/json')
		.expect(400)

	    await api
		.get('/api/users')
		.expect(({body}) => assert.equal(body.length, testVars.manyUsersArr.length + 1)) 
	})
	test('users with malformed username are not created', async () => {
	    await api
		.post('/api/users')
		.send(testVars.malfromedUsernameArr[0])
		.set('Content-Type', 'application/json')
		.expect(400)

	    await api
		.get('/api/users')
		.expect(({body}) => assert.equal(body.length, testVars.manyUsersArr.length + 1)) 
	})
    })

})



after(async () => {
	await User.deleteMany({ username: { $ne: testVars.testUser.username } })
	await mongoose.connection.close()
})
