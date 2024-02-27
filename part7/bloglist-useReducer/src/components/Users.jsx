import { useEffect, useState } from "react"
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    userService.getUsers().then(data => {
      setUsers(data)
    })
  }, [])

  if (users === null) return null

  return (
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
                <td>{u.name}</td>
                <td>{u.blogs.length}</td>
              </tr>
            ))}


        </tbody>
      </table>
  )
}

export default Users