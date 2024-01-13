const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', {username: 1, name:1})
    response.json(blogs)
  } catch (exception) {
    next (exception)
  }
})

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const foundBlog = await Blog.findById(request.params.id)
    response.status(200).json(foundBlog)
  } catch(exception) {
    next(exception)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes = 0 , userId} = request.body

  const user = await User.findById(userId)
  
  if (user === null) {
    return response.status(400).json({
      error: 'user id is not found.'
    })
  }

  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id
  })
  
  try {
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.statusCode = 201
    response.json(savedBlog)
  } catch(exception) {
    next(exception)
  }

})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body
  try {
    const newBlogInfo = {
      title,
      author,
      url,
      likes
    }
    const newBlog = await Blog
      .findByIdAndUpdate(
        request.params.id, newBlogInfo, { new: true, runValidators: true })
    response.json(newBlog)
  } catch(exception) {
    next(exception)
  }
})


module.exports = blogRouter