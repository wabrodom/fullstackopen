
import { useState } from 'react'


const CommentFrom = ({handleAddedComment, blogId}) => {
  const [comment, setComment] = useState(null)

  const handleCommentChange = (event) => setComment(event.target.value)

  const addComment = (event) => {
    event.preventDefault()
    const obj = {"comment": comment }
    console.log('here ',obj)
    handleAddedComment(blogId, obj)
    setComment('')  
  }

  return(
    <form onSubmit={addComment}>
        <input 
          type='text'
          name='comment'
          onChange={handleCommentChange}
          placeholder='add comment'
        />
        <button type='submit'>add comment</button>
    </form>
  )
}

export default CommentFrom