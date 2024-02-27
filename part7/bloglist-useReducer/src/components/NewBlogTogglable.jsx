import BlogForm from "./BlogForm"
import Togglable from "./Togglable"

const NewBlogTogglable = ({buttonLabel, passedRef, handleAddBlog }) => {

  return (
    <Togglable buttonLabel={buttonLabel} ref={passedRef}>
      <BlogForm handleAddBlog={handleAddBlog}  />
    </Togglable>
  )
}

export default NewBlogTogglable