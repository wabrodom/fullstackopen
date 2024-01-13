const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', {
        url: 1,
        title: 1,
        author: 1
      })
    response.status(200).json(users)
  } catch(exception) {
    next(exception)
  }
})

userRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (username === undefined || password === undefined) {
    return response.status(400).json({
      error: 'username and password are required.'
    })
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'username and password must be at least 3 characters long.'
    })
  }

  try {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  const user = new User({
    username,
    name,
    passwordHash
  })
  
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch(exception) {
    next(exception)
  }
})

module.exports = userRouter