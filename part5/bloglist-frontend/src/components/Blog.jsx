import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) =>  {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '': 'none'}
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const creator = blog.user.id
  const removeButton = () => (
    <button onClick={() => handleDelete(blog.id, blog)}>Remove</button>
  )

  return (
   <div style={blogStyle}>
       <div>
          {blog.title}
          <button onClick={() => setVisible(!visible)}>
            {visible ? 'hide': 'view'}
          </button>
      </div>

      <section style={showWhenVisible}>
        <div>
          <a href={ `${blog.url}` }>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes} 
          <button onClick={() => handleLike(blog.id)}>Like</button>
        </div>
        <div>
          {blog.author} 
          {currentUser === creator ? removeButton(): ''}
        </div>


      </section>
  
  
   </div>  
  )
}


export default Blog