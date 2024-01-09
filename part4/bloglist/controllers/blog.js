const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
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
  const { title, author, url, likes = 0 } = request.body
  const newBlog = new Blog({
    title,
    author,
    url,
    likes
  })

  try {
    const savedBlog = await newBlog.save()

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