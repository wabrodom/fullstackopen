const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  for (let ablog of helper.initialBlogs) {
    let blogObject = new Blog(ablog)
    await blogObject.save()
  }
})

test('blog lists are return as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is in returned blogs', async () => {
  const blogsAtEnd = await helper.blogsInDb()

  const blogTitles = blogsAtEnd.map(blog => blog.title)
  expect(blogTitles).toContain(
    'Mr. Money Mustache'
  )
})



afterAll(async () => {
  await mongoose.connection.close()
})

// npm run test -- bloglist_api.test