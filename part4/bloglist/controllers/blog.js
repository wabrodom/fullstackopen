const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const foundBlog = await Blog.findById(request.params.id)
  response.status(200).json(foundBlog)
})

blogRouter.post('/', async (request, response) => {
  const newBlog = new Blog(request.body)
  const savedBlog = await newBlog.save()

  response.statusCode = 201
  response.json(savedBlog)

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