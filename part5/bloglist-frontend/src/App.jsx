import { useState, useEffect, useRef } from 'react'
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

  const blogFormRef = useRef()
  
  const handleAddBlog = async (object) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(object)
      setBlogs(blogs.concat(returnedBlog))

      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setMessageClass('success')
      setTimeout(() => {setMessage(null)}, 5000)
    } catch(exception) {
      // console.log(exception)
      setMessage(exception.response.data.error + ' redirect to login again')
      setMessageClass('error')  
      setTimeout(() => {setMessage(null)}, 5000)
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
      setMessage(`like is add to ${returnedBlog.title} by ${returnedBlog.author}`)
      setMessageClass('success')
      setTimeout(() => {setMessage(null)}, 5000)

    } catch(exception) {
      // console.log(exception)
      setMessage(exception.response.data.error)
      setMessageClass('error')  
      setTimeout(() => {setMessage(null)}, 5000)
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
        if (errorMessage === "jwt expired") {
          setMessage('login session expired, please login again')
          setMessageClass('error')  
          setTimeout(() => {setMessage(null)}, 5000)
          window.localStorage.removeItem('loggedBloglistUser')
          setUser(null)
        } else {
          console.log(exception.response)
        }

      }
      
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

      <Notification 
        message={message} 
        messageClass={messageClass}
      />

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