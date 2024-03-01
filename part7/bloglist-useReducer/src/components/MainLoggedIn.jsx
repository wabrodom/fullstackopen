import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const MainLoggedIn = ({ user, handleLogout }) => {

  return (
    <span>
      
      <Button component={Link} to={`users/${user.id}`} color='inherit'>
          <em>{user.name} logged in</em>
      </Button> 
      
      <Button onClick={handleLogout} color='secondary'>
         Log out
      </Button>
    </span>
  )
}

export default MainLoggedIn