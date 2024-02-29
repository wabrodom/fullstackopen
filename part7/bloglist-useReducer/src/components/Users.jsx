import { useEffect, useState } from "react"
import userService from '../services/users'
import { Link } from "react-router-dom"
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

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
      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>user</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
              {users.map(u => (
                <TableRow key={u.id} >
                  <TableCell>
                    <Link to={`/users/${u.id}`} >
                      {u.name}
                    </Link>
                  </TableCell>
                  <TableCell>{u.blogs.length}</TableCell>
                </TableRow>
              ))}


          </TableBody>
                
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users