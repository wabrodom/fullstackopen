import { useParams } from "react-router-dom"
import { useCurrentUser } from "../contexts/loginContext"

const BlogSimpleVersion = ({ blogs, handleLike, handleDelete }) =>  {
  const currentUser = useCurrentUser()
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  
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
     
        <h2>
          {blog.title}
        </h2>

   
        <div>
          <a href={ `${blog.url}` } target="_blank" >{blog.url}</a>
        </div>

        <div>
          author {blog.author}
        </div>

        <div>
          likes: <span className='likes'>{blog.likes}</span>
          <button onClick={() => handleLike(blog.id)} className='like-button'>Like</button>
        </div>

        <div>
          <p>added by {blog.user.username}</p>
        </div>
        <div>
          {currentUser === creator ? removeButton(): ''}
        </div>

    </div>
  )
}


export default BlogSimpleVersion