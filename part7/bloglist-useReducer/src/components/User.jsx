import { useParams } from "react-router-dom"

const User = ({ blogs }) => {
  const userId = useParams().id
  const currentUserBlogs = blogs.filter(obj => obj.user.id === userId)

  return (
    <div>
      <h3>added blogs</h3>
      {currentUserBlogs.map(obj => (
        <li key={obj.id}>
          {obj.title}
        </li>
      ))}
    </div>
  )

}

export default User