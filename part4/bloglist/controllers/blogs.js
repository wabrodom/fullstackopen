const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', {username: 1, name:1})
    response.json(blogs)
  } catch (exception) {
    next (exception)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const foundBlog = await Blog.findById(request.params.id)
    response.status(200).json(foundBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/',  middleware.userExtracter , async (request, response, next) => {
  const { title, author, url, likes = 0 } = request.body

  try {
    const user = request.user

    if (user === null) {
      return response.status(400).json({
        error: 'the user id is not found.'
      })
    }
    
    const newBlog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id
    })
    
  
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.statusCode = 201
    response.json(savedBlog)

  } catch(exception) {
    next(exception)
  }

})

blogsRouter.delete('/:id', middleware.userExtracter, async (request, response, next) => {
  try {
    const user = request.user

    if (user === null) {
      return response.status(400).json({
        error: 'Bad request. The user id is not found.'
      })
    }
    
    const foundBlog = await Blog.findById(request.params.id)
    if (foundBlog.user._id.toString() === user._id.toString()) {
      const deleteBlog = await Blog.findByIdAndRemove(request.params.id)
  
      user.blogs = user.blogs.filter(blogId =>  {
        // console.log('blogs array store blogId as id object',blogId)
        return blogId.toString() !== deleteBlog._id.toString()
      })
      
      await user.save()
  
      response.status(204).end()
    }
    return response.status(400).json({
      error: 'Bad request. The user is not created this blog'
    })
  
  } catch(exception) {
    next(exception)
  }

})

blogsRouter.put('/:id', middleware.userExtracter, async (request, response, next) => {
  const { title, author, url, likes } = request.body
  try {

    const userId = request.user._id
    const foundBlog = await Blog.findById(request.params.id)

    if (foundBlog.user._id.toString() === userId.toString()) {
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
    } else if(userId) {
      foundBlog.likes = likes
      const returnedBlog = await foundBlog.save()
      response.json(returnedBlog)
    }

  } catch(exception) {
    next(exception)
  }
})


module.exports = blogsRouter