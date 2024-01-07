const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Mr. Money Mustache',
    author: 'Pete Adeny',
    url: 'https://www.mrmoneymustache.com/blog/'
  },
  {
    title: 'You don\'t know js',
    author: 'Kyle Simpson ',
    url: 'https://github.com/getify/You-Dont-Know-JS/',
    likes: 0
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
}