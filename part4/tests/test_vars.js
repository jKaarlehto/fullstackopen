const manyBlogsArr = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0
	}
]

const oneBlogArr = [
	{

		_id: "5a422bc61b54a676234d17fb",
		title: 'THIS IS FROM THE ONE BLOG ARR',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	}
]


const zeroLikeBlogArr = [
	{
		_id: '5a422aa71b54a676234d17f9',
		title: 'This has 0 likes',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		__v: 0
	}
]

const malformedBlogArr = [
	{
		_id: '5a422aa71b54a676234d17d0',
		author: 'Edsger W. Dijkstra',
		__v: 0
	}
]

const manyUsersArr = [
	{
		"username": "user1",
		"name": "Alice Johnson",
		"password": "a1b2c3d4e5f6g7h8i9j0"
	},
	{
		"username": "user2",
		"name": "Bob Smith",
		"password": "z9y8x7w6v5u4t3s2r1q0"
	},
	{
		"username": "user3",
		"name": "Charlie Brown",
		"password": "m1n2o3p4q5r6s7t8u9v0"
	},
	{
		"username": "user4",
		"name": "Diana Prince",
		"password": "h1e2r3o4i5c6d7e8m9n0"
	},
	{
		"username": "user5",
		"name": "Eve White",
		"password": "k1l2m3n4o5p6q7r8s9t0"
	}
]

const oneUserArr = [
	{
		"username": "user6",
		"name": "Frank Castle",
		"password": "p1u2n3i4s5h6e7r8x9y0"
	}
]

const missingUsernameArr = [
	{
		"name": "Grace Hopper",
		"passwordHash": "c0d1e2b3u4g5f6i7x8y9"
	}
]

const malfromedUsernameArr = [
    {
  "username": "u1",
  "name": "Henry Ford",
  "passwordHash": "a1b2c3d4e5f6g7h8i9j0"
}
]


module.exports = { manyBlogsArr, oneBlogArr, zeroLikeBlogArr, malformedBlogArr, manyUsersArr, oneUserArr, missingUsernameArr, malfromedUsernameArr }
