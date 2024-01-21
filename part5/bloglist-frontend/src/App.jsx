import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState(null)
 
  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleOnChangeUsername = ({target}) => setUsername(target.value)
  const handleOnChangePassword = ({target}) => setPassword(target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const objectWithToken = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(objectWithToken))

      setUser(objectWithToken)
      blogService.setToken(objectWithToken.token)
      setUsername('')
      setPassword('')
      console.log('successful login')
    } catch (excecption) {
      setMessage('login fail')
      setMessageClass('error')
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const handleAddBlog = async (object) => {
    try {
      const returnedBlog = await blogService.create(object)

      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setMessageClass('success')
      setTimeout(() => {setMessage(null)}, 5000)
    } catch(exception) {
      console.log(exception)
      setMessage(exception)
      setMessageClass('error')
      setTimeout(() => {setMessage(null)}, 5000)
    }
  } 

  // const blogForm = () => {
  //   const hideWhenVisible = { display: blogFormVisible ? 'none' : ''}
  //   const showWhenVisible = { display: blogFormVisible ? '': 'none'}

  //   return (
  //     <div>
  //       <div style={hideWhenVisible}>
  //         <button onClick={()=> setBlogFormVisible(true)}>new note</button>
  //       </div>
  //       <div style={showWhenVisible}>
  //         <BlogForm handleAddBlog={handleAddBlog} />
  //         <button onClick={()=> setBlogFormVisible(false)}>cancel</button>
  //       </div>
  //     </div>
  //   )
  // }

  
 

  if (user === null) {
    return (
      <div>  
        <Notification 
          message={message} 
          messageClass={messageClass}
        />

        <Login 
          handleLogin={handleLogin}
          handleOnChangeUsername={handleOnChangeUsername}
          handleOnChangePassword={handleOnChangePassword}
          username={username}
          password={password}
        />  
      </div>
    )
  }

  return (
    <section>
      <h2>Blogs</h2>

      <Notification 
        message={message} 
        messageClass={messageClass}
      />

      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>

      <Togglable buttonLabel='new blog'>
        <BlogForm handleAddBlog={handleAddBlog} />
      </Togglable>
      

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </section>
  )
}

export default App