import { Link } from "react-router-dom"
import MainLoggedIn  from './MainLoggedIn'
import {
  AppBar, 
  Toolbar,
  IconButton,
  Button,
} from '@mui/material'

const NavBar = ({user, handleLogout}) => {

  return (
    <AppBar position="static">
      <Toolbar>
        <div >
          <Button color="inherit" component={Link} to='/'>
            blogs
          </Button>
          <Button color="inherit" component={Link} to='/users'>
            Users
          </Button>
            {user &&
              <MainLoggedIn 
                  user={user}
                  handleLogout={handleLogout}
                />
            }
        </div>

      </Toolbar>

    </AppBar>
  )
}

export default NavBar