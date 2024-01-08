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

blogRouter.post('/', async (request, response) => {
  const {title, author, url, likes = 0} = request.body
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

  /* .promise style
    const blog = new Blog(request.body)

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  */
})

module.exports = blogRouter