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

describe('when there is some initial blogs saved', () => {

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

})

describe('viewing a specific blog', () => {

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
    // console.log(response.body)
    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'Go To Statement Considered Harmful'
    )

  })

  test('if like prop missing in the request.body it default value will be 0', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const lastBlog = blogsAtEnd[blogsAtEnd.length -1]

    expect(lastBlog.title).toEqual('Type wars')
    expect(lastBlog.likes).toEqual(0)
  })

  test('if the title or url properties are missing, get code 400 Bad Request', async () => {
    const noTitleBlog = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }
    const noUrlBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
    }

    await api.post('/api/blogs')
      .send(noTitleBlog)
      .expect(400)

    await api.post('/api/blogs')
      .send(noUrlBlog)
      .expect(400)
  })

})

describe('deletion of a blog', () => {
  test('succeed with status code 204 if id is valid' , async () => {
    const blogAtStart = await helper.blogsInDb()
    // console.log('blogs in DB at start', blogAtStart)
    const blogToDelete = blogAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length -1)

    const titles = blogAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)

  })
})

describe('update a blog', () => {
  test('can update a specific blog likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newBlogInfo = {
      likes : 10
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlogInfo)
      .expect(200)

    const updatedBlog = await Blog.findById(blogToUpdate.id)
    expect(updatedBlog.likes).toEqual(10)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})

// npm run test -- bloglist_api.test