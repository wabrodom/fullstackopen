import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      setUsername('')
      setPassword('')

      console.log('successful login')
    } catch (excecption) {
      console.log('login fail')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const handleAddBlog = async(event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    console.log(formData)
    const formJSON = Object.fromEntries(formData.entries())
    console.log(formJSON)
  } 

  const addBlog = () => (
    <form onSubmit={handleAddBlog}>
      <div>
        <label htmlFor='title'>title: </label>
        <input 
          type='text'
          name='title'
          id='title'
        />
      </div>

      <div>
        <label htmlFor='author'>author: </label>
        <input 
          type='text'
          name='author'
          id='author'
        />
      </div>

      <div>
        <label htmlFor='url'>url: </label>
        <input 
          type='url'
          name='url'
          id='url'
        />
      </div>

   
    <button type='submit'>create</button>
    

     

    </form>
  )
 

  if (user === null) {
    return (
        <Login 
          handleLogin={handleLogin}
          handleOnChangeUsername={handleOnChangeUsername}
          handleOnChangePassword={handleOnChangePassword}
          username={username}
          password={password}
        />  
    )
  }

  return (
    <section>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>

      {addBlog()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </section>
  )
}

export default App