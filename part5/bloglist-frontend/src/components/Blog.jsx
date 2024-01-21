import { useState } from 'react'

const Blog = ({ blog }) =>  {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '': 'none'}
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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
        </div>
        <div>
          {blog.author} 
        </div>
    

      </section>
  
  
   </div>  
  )
}


export default Blog