import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)
  const navigate = useNavigate()

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
    navigate('/blogs')
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