import { useState, useEffect, useRef, useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotiDispatch } from './contexts/NotificationContext'




const App = () => {
  const setMessage = useNotiDispatch()
  const queryClient = useQueryClient()

  // const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs']})
      setMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'success',
         5
      )
    },
    onError: (error) => {
      setMessage(error + ' redirect to login again', 'errer', 5)
      window.localStorage.removeItem('loggedBloglistUser')
      setUser(null)
    }
  })


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  const blogs = result.data

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
      setMessage('login failed ja', 'error', 5)
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
      newBlogMutation.mutate(object)
    } catch(exception) {
      // console.log(exception)
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
      setMessage(`like is add to ${returnedBlog.title} by ${returnedBlog.author}`, 'success', 5)
    } catch(exception) {
      // console.log(exception)
      setMessage(exception.response.data.error, 'error', 5)
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
          setMessage('login session expired, please login again', 'error', 5)
          window.localStorage.removeItem('loggedBloglistUser')
          setUser(null)
        } else {
          console.log(exception.response)
        }

      }

    }
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>  
  }


  if (user === null) {
    return (
 
        <div>
          <Notification />

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

        <Notification/>

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