const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user');
const Blog = require('../models/blog')

beforeAll( async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs.map(aBlog => new Blog(aBlog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is one user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('somePassword', 10)
    const user = new User({
      username: 'root',
      name: 'root',
      passwordHash
    })

    await user.save()

  })

  test('creation succeed with new username' , async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'bombom',
      name: 'bombom',
      password: 'salainen',
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length +1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST request to add user that invalid form will get 400 Bad request', async () => {
    const usersAtStart = await helper.usersInDb()

    const usernameShort = {
      username: 'bo',
      name: 'bombom',
      password: '123',
    }

    const passwordShort = {
      username: 'bom',
      name: 'bombom',
      password: '12',
    }

    await api.post('/api/users')
      .send(usernameShort)
      .expect(400)

    await api.post('/api/users')
      .send(passwordShort)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(usernameShort.username)
    expect(usernames).not.toContain(passwordShort.username)
  })

})


describe('when user have valid token or invalid token', () => {
  beforeEach( async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('somePassword', 10)
    const user = new User({
      username: 'root',
      name: 'root',
      passwordHash
    })

    await user.save()
  })

  const userLoginInfo = {
    username: 'root',
    password: 'somePassword'
  }
  

  test('no token in authorization header will 401' , async() => {
    const newBlog = {
      "title": "user not have token in header",
      "author": "bombom",
      "url": "https://adamgrant.net/"
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('user have valid token in header can POST 200', async () => {

    const userObjectWithToken = await api
      .post('/api/login')
      .send(userLoginInfo)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const newBlog = {
      "title": "have valid token in header",
      "author": "bombom",
      "url": "https://adamgrant.net/"
    }

    const authorizationStr =  'bearer ' + userObjectWithToken.body.token

    await api
      .post('/api/blogs')
      .set({ Authorization: authorizationStr})
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('have valid token in header')
  })

  test('only user who create blog will be able to delete the blog', async() => {

    const userObjectWithToken = await api
      .post('/api/login')
      .send(userLoginInfo)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const token =  'bearer ' + userObjectWithToken.body.token
    const authorization = { Authorization : token }

    const newBlog = {
      "title": "this blog will be deleted",
      "author": "bombom",
      "url": "https://adamgrant.net/"
    }

    const response = await api
      .post('/api/blogs')
      .set(authorization)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAddOne = await helper.blogsInDb()

    const returnedBlog = response.body
    
    expect()
      await api
      .delete(`/api/blogs/${returnedBlog.id.toString()}`)
      .set(authorization)
      .expect(204)
    const blogsAfterDelete = await helper.blogsInDb()
    const titles = blogsAfterDelete.map(b => b.title)

    expect(blogsAfterDelete).toHaveLength(blogsAfterAddOne.length -1)
    expect(titles).not.toContain(newBlog.title)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})