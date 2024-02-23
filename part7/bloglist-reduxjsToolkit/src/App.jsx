import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
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

  const dispatch = useDispatch()

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

  const handleOnChangeUsername = ({ target }) => setUsername(target.value)
  const handleOnChangePassword = ({ target }) => setPassword(target.value)

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
      dispatch(setMessage('login fail', 'error', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const blogFormRef = useRef()

  const handleAddBlog = async (object) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(object)
      setBlogs(blogs.concat(returnedBlog))

      console.log(returnedBlog)
      dispatch(setMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        'success'
        , 5
      ))
    } catch(exception) {
      // console.log(exception)
      dispatch(setMessage(
        exception.response.data.error + ' redirect to login again',
        'success',
         5
      ))

      window.localStorage.removeItem('loggedBloglistUser')
      setUser(null)
    }
  }

  const likeABlog = async (id) => {
    try {
      const foundBlog = await blogService.getABlog(id)
      foundBlog.likes = foundBlog.likes +1
      const returnedBlog = await blogService.update(id, foundBlog)

      const copyBlogs = [...blogs]

      for (let i =0; i < copyBlogs.length; i++) {
        if (copyBlogs[i].id === id) {
          copyBlogs[i] = returnedBlog
        }
      }
      copyBlogs.sort((a,b) => b.likes - a.likes)
      setBlogs(copyBlogs)
      dispatch(setMessage(
        `like is add to ${returnedBlog.title} by ${returnedBlog.author}`,
         'success',
          5
        ))

    } catch(exception) {
      // console.log(exception)
      dispatch(setMessage(
        exception.response.data.erro,
        'error',
        5
      ))
    }
  }

  const removeAblog = async (id, blog) => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(id)
        const newBlogs = blogs.filter(b => b.id !== id)
        setBlogs(newBlogs)

      } catch(exception) {
        const errorMessage = exception.response.data.error
        if (errorMessage === 'jwt expired') {
          dispatch(setMessage('login session expired, please login again', 'error' , 5))
          window.localStorage.removeItem('loggedBloglistUser')
          setUser(null)
        } else {
          console.log(exception.response)
        }

      }

    }
  }

  if (user === null) {
    return (
      <div>
        <Notification/>

        <LoginForm
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

      <Notification />

      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm handleAddBlog={handleAddBlog}  />
      </Togglable>


      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={likeABlog}
          handleDelete={removeAblog}
          currentUser={user.id}
        />
      )}
    </section>
  )
}

export default App