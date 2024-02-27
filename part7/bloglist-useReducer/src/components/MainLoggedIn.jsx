import { Link } from 'react-router-dom'
const MainLoggedIn = ({ user, handleLogout }) => {

  return (
    <section>
      <h2>Blogs</h2>
      <span>
        <Link to={`users/${user.id}`}>
          {user.name} 
        </Link> logged in 
      </span>
      <button onClick={handleLogout}>Logout</button>
    </section>
  )
}

export default MainLoggedIn