import { useParams } from "react-router-dom"
import { useCurrentUser } from "../contexts/loginContext"
import { useNavigate } from "react-router-dom"
import { Container, Paper, Box } from "@mui/material"
import CommentFrom from "./CommentForm"
import Comments from "./Comment"

const BlogSimpleVersion = ({ blogs, handleLike, handleDelete, handleAddedComment }) =>  {
  const currentUserId = useCurrentUser().id
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const commentsArray = blog.comments
  const navigate = useNavigate()
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonClick = () => {
    handleDelete(blog.id, blog)
    navigate('/blogs')
  }

  const creator = blog.user.id
  const removeButton = () => (
    <button onClick={removeButtonClick} className='remove-button'>Remove</button>
  )

  const space  = {
    mx: '1rem' , 
    p: '0.5rem',
  }

  return (
    <Container component={Paper} sx={{p: '0.1rem'}} >
      <Box 
        sx={space}
        borderBottom= '0.25rem solid lightgrey'
        borderRadius= '0.5rem'
      >
        <section>

      
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
          {currentUserId === creator ? removeButton(): ''}
        </div>

        </section>
      </Box>
      <Box sx={space}>
        <section>
          <h2>Comments</h2>
          <CommentFrom 
            handleAddedComment={handleAddedComment}
            blogId={id}
          />
          <Comments comments={commentsArray} />
        </section>
      </Box>
    </Container>
  )
}


export default BlogSimpleVersion