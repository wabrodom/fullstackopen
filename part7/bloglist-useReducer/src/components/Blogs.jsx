import Blog from "./Blog"
import { useCurrentUser } from "../contexts/loginContext"


const Blogs = ({ blogs, handleLike, handleDelete}) => {
  const user = useCurrentUser()
  return (
    <>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          currentUser={user.id}
        />
      )}
    </>
  )
}

export default Blogs