const dummy = (blogs) => {
  return 1
}

const sum = (array) => {
  return array.reduce((acc, curr) => acc + curr, 0)
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes);
  return sum(likes)
}

const favoriteBlog = (blogs) => {
  const mostLike = {  
    title: "",
    author: "",
    likes: 0
  }
  for (const blog of blogs) {
    if (blog.likes > mostLike.likes) {
      mostLike.title = blog.title
      mostLike.author = blog.author
      mostLike.likes = blog.likes
    }
  }
  return mostLike
}

const mostBlogs = (blogs) => {
  if (blogs.length < 1) {
    return {}
  }
  const map = new Map()
  const maxBlogAuthor = {
    author: '',
    blogs: 0
  }

  for (const blog of blogs) {
    const {author} = blog
    const currentCount = map.get(author) || 0

    map.set(author, currentCount + 1)
  }

  const itertorAuthor = map.entries()

  for (let i = 0; i < map.size; i++) {
    const [author, blogs] = itertorAuthor.next().value

    if (blogs > maxBlogAuthor.blogs) {
      maxBlogAuthor.author = author
      maxBlogAuthor.blogs = blogs
    }
  }

  return maxBlogAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length < 1) {
    return {}
  }
  const map = new Map()
  const mostLikesAuthor = {
    author: '',
    likes: 0
  }

  for (let i = 0; i < blogs.length; i++) {
    const {author, likes} = blogs[i]
    const currentLikes = map.get(author) || 0
    
    map.set(author, currentLikes + likes)
  }
  const authorAndLikes = [...map.entries()] 

  for (let i = 0; i < authorAndLikes.length; i++) {
    const [currAuthor, currLikes] = authorAndLikes[i]
    console.log(currAuthor, currLikes)
    if (currLikes > mostLikesAuthor.likes) {
      mostLikesAuthor.author = currAuthor
      mostLikesAuthor.likes = currLikes
    }
  }

  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}