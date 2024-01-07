const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 3,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: Number
})

blogSchema.set('toJSON', {
  transform : (document, returnedObject) => {
    returnedObject.id = returnedObject._id // now don't need .toString() ?
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog