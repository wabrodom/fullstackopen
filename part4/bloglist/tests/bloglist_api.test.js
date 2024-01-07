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
  const response = await api.get('/api/blogs')

  const blogTitles = response.body.map(blog => blog.title)
  expect(blogTitles).toContain(
    'Mr. Money Mustache'
  )
})

test('unique identifier property of the blog posts is named id not _id', async() => {
  const response = await api.get('/api/blogs')

  const firstBlog = response.body[0]
  // console.log(typeof firstBlog.id)
  expect(firstBlog.id).toBeDefined()
})

test('a valid blog can be added' ,async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  console.log(response.body)
  const titles = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain(
    'Go To Statement Considered Harmful'
  )

})

afterAll(async () => {
  await mongoose.connection.close()
})

// npm run test -- bloglist_api.test