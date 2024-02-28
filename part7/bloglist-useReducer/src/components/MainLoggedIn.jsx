import { Link } from 'react-router-dom'
const MainLoggedIn = ({ user, handleLogout }) => {

  return (
    <span>
      <em>
        <Link to={`users/${user.id}`}>
          {user.name} 
        </Link> logged in 
      </em>
      <button onClick={handleLogout}> Log out</button>
    </span>
  )
}

export default MainLoggedIn