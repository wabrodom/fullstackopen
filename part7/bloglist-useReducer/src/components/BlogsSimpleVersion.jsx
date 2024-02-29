import { Link } from "react-router-dom";
import NewBlogTogglable from "./NewBlogTogglable"

const BlogsSimpleVersion = ({ blogs, handleAddBlog, passedRef}) => {

  const blogStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <NewBlogTogglable
        buttonLabel='new blog'
        handleAddBlog={handleAddBlog}
        passedRef={passedRef}
      />

      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
           {blog.title}
          </Link>
           <span> likes: {blog.likes}</span>
        </div> 
      )}
    </div>
  )
}

export default BlogsSimpleVersion