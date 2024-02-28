import { Link } from "react-router-dom";

const BlogsSimpleVersion = ({ blogs }) => {

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
      <h1>Blogs</h1>
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