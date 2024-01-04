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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}