import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import {
  TextField, Button
} from '@mui/material'

const LoginForm = (props) => {
  const handleLogin = props.handleLogin
  const handleOnChangeUsername = props.handleOnChangeUsername
  const handleOnChangePassword = props.handleOnChangePassword
  const username = props.username
  const password = props.password

  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    handleLogin()
    navigate('/')
  }


  return (
    <form onSubmit={onSubmit}>
      <div>
        <TextField
          label='Username'
          type="text"
          value={username}
          name='Username'
          onChange={handleOnChangeUsername}
        />
      </div>
      <div>
        <TextField
          label='Password'
          type='password'
          value={password}
          name='Password'
          onChange={handleOnChangePassword}
        />
      </div>
      <Button 
        type='submit' 
        id='login-button' 
        variant="contained" 
        olor="primary"
      >
        Login
      </Button>
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