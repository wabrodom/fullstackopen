const Blog = require('../models/blog')
const User = require('../models/user')

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

const nonExistingId = async () => {
  const note = new Blog( {
    title: '100 Tips for a Better Life',
    author: 'Conor Barnes',
    url: 'https://www.lesswrong.com/posts/7hFeMWC6Y5eaSixbD/100-tips-for-a-better-life/'
  })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}