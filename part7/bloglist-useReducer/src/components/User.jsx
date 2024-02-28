import { useParams, Link } from "react-router-dom"
import NewBlogTogglable from "./NewBlogTogglable"


const User = ( { blogs, passedRef, handleAddBlog }) => {
  const userId = useParams().id
  const currentUserBlogs = blogs.filter(obj => obj.user.id === userId)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <h3>added blogs</h3>

      <NewBlogTogglable
        buttonLabel='new blog'
        handleAddBlog={handleAddBlog}
        passedRef={passedRef}
      />
      <ol>

        {currentUserBlogs.map(obj => (

          <li key={obj.id}>
            <Link  to={`/blogs/${obj.id}`}>
              {obj.title}
            </Link>
          </li>

        ))}

      </ol>
    </div>
  )

}

export default User