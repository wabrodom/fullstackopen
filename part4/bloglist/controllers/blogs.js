const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  const regex = /Bearer /i
  if (authorization && authorization.match(regex)) {
    const newString = authorization.replace(regex, '')
    return newString
  }
  return null
}


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

blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes = 0 } = request.body

  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    console.log('decodedToken',decodedToken)
    if (!decodedToken.id) {
      //jwt.verify -> if invalid it will be called with the error. (401)
      // so it will not reach here
      return response.status(401).json({ error: 'token invalid...' })
    }
    const user = await User.findById(decodedToken.id)
    
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

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
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


module.exports = blogsRouter