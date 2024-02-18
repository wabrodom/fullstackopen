import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) =>  {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '': 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const creator = blog.user.id
  const removeButton = () => (
    <button onClick={() => handleDelete(blog.id, blog)} className='remove-button'>Remove</button>
  )

  return (
    <div style={blogStyle} className='blog'>
      <section className='showByDefaultContent'>
        <div>
          {blog.title}
        </div>
        <div>
          {blog.author}
        </div>
        <button onClick={() => setVisible(!visible)} className='view-button'>
          {visible ? 'hide': 'view'}
        </button>

      </section>

      <section style={showWhenVisible}>
        <div>
          <a href={ `${blog.url}` }>{blog.url}</a>
        </div>
        <div>
          likes <span className='likes'>{blog.likes}</span>
          <button onClick={() => handleLike(blog.id)} className='like-button'>Like</button>
        </div>
        <div>
          {currentUser === creator ? removeButton(): ''}
        </div>


      </section>


    </div>
  )
}


export default Blog