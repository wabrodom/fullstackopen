import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const LoginForm = (props) => {
  const handleLogin = props.handleLogin
  const handleOnChangeUsername = props.handleOnChangeUsername
  const handleOnChangePassword = props.handleOnChangePassword
  const username = props.username
  const password = props.password

  const onSubmit = (e) => {
    e.preventDefault()
    handleLogin()
    navigate('/')
  }

  const navigate = useNavigate()

  return (
    <form onSubmit={onSubmit}>
      <div>
        Username
        <input
          type="text"
          value={username}
          name='Username'
          onChange={handleOnChangeUsername}
        />
      </div>
      <div>
        Password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={handleOnChangePassword}
        />
      </div>
      <button type='submit' id='login-button'>Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleOnChangeUsername: PropTypes.func.isRequired,
  handleOnChangePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}


export default LoginForm