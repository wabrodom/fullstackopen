import { useEffect, useState } from "react"
import userService from '../services/users'
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    userService.getUsers().then(data => {
      setUsers(data)
    })
  }, [])

  if (users === null) return null

  return (
    <div>
       <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
            {users.map(u => (
              <tr key={u.id} >
                <td>
                  <Link to={`/users/${u.id}`} >
                    {u.name}
                  </Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            ))}


        </tbody>
      </table>
    </div>
  )
}

export default Users