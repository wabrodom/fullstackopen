import { Link } from 'react-router-dom'
const MainLoggedIn = ({ user, handleLogout }) => {

  return (
    <span>
      <span>
        <Link to={`users/${user.id}`}>
          {user.name} 
        </Link> logged in 
      </span>
      <button onClick={handleLogout}>Logout</button>
    </span>
  )
}

export default MainLoggedIn