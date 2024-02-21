import { useState, useRef } from 'react'
import { createBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const BlogForm = ( { ref }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)

  const handleAddBlog = async (object) => {
    ref.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(object)
      createBlog(returnedBlog)

      dispatch( setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 5))
      // setMessageClass('success')
      setTimeout(() => dispatch(clearNotification()), 5000)
    } catch(exception) {
      // console.log(exception)
      dispatch( setMessage(exception.response.data.error + ' redirect to login again') )
      // setMessageClass('error')
      setTimeout(() => dispatch(clearNotification()), 5000)
      window.localStorage.removeItem('loggedBloglistUser')
      setUser(null)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    handleAddBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor='title'>title: </label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <div>
        <label htmlFor='author'>author: </label>
        <input
          type='text'
          name='author'
          id='author'
          value={author}
          onChange={handleAuthorChange}
        />
      </div>

      <div>
        <label htmlFor='url'>url: </label>
        <input
          type='url'
          name='url'
          id='url'
          value={url}
          onChange={handleUrlChange}
        />
      </div>


      <button type='submit' id='create-blog'>create</button>

    </form>

  )
}

export default BlogForm