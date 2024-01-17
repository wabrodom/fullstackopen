const Login = (props) => {
  const handleLogin = props.handleLogin
  const handleOnChangeUsername = props.handleOnChangeUsername
  const handleOnChangePassword = props.handleOnChangePassword
  const username = props.username
  const password = props.password
  
  return (
      <form onSubmit={handleLogin}>
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
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login