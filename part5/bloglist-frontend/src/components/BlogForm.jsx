import { useState } from 'react'

const BlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog =  (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    handleAddBlog(newBlog)

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
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        <label htmlFor='author'>author: </label>
        <input
          type='text'
          name='author'
          id='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        <label htmlFor='url'>url: </label>
        <input
          type='url'
          name='url'
          id='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>


      <button type='submit'>create</button>

    </form>

  )
}

export default BlogForm