import { useState, useEffect, useRef, useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate, useMatch, useNavigate
} from 'react-router-dom'
import blogService from './services/blogs'
import { useNotiDispatch } from './contexts/NotificationContext'
import { 
  useCurrentUser, 
  useSetUser ,
  useLoginDispatch, 
  useResetUser
} from './contexts/loginContext'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import User from './components/User'
import NewBlogTogglable from './components/NewBlogTogglable'
import Users from './components/Users'
import MainLoggedIn from './components/MainLoggedIn'
import BlogsSimpleVersion from './components/BlogsSimpleVersion'
import BlogSimpleVersion from './components/BlogSimpleVersion'


const App = () => {
  const queryClient = useQueryClient()
  const setMessage = useNotiDispatch()
  const user = useCurrentUser()
  const setUser = useSetUser()
  const loginUser = useLoginDispatch()
  const resetUser = useResetUser()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

 const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    onSuccess: (arrayOfObject) => {
      const copyBlogs = [...arrayOfObject]
      return copyBlogs.sort((a,b) => b.likes - a.likes)
    } 
  })

 const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs']})
      const message =  `a new blog ${newBlog.title} by ${newBlog.author} added`
      setMessage(message,'success',5)
    },
    onError: (error) => {
      setMessage(error.message + ' redirect to login again', 'errer', 5)
      // window.localStorage.removeItem('loggedBloglistUser')
      resetUser()
    }
  })


 const likeBlogMutation = useMutation({
    mutationFn: blogService.likeABlog,
    onSuccess: (newblog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs']})
      const message = `like is add to ${newblog.title} by ${newblog.author}`
      setMessage(message ,'success',5)
    },
    onError: (error) => {
      setMessage(error.message, 'error', 5)
      resetUser()
    }
  })

 const removeBlogMutataion = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs']})
    },
    onError: (error) => {
      setMessage(error.message, 'error login again', 5)
      resetUser()
    }
  })

  const addCommentMutation = useMutation({
    mutationFn: blogService.comment,
    onSuccess: () => {
      queryClient.invalidateQueries( { queryKey: ['blogs']})
    },
    onError: (error) => {
      setMessage(error.message, 'error login again', 5)
      resetUser()
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

  const handleLogin = async () => {
    try {
      const responseBack = (loginUser({username, password}) ) 
      const resolvetoErrorObject = await responseBack
      if (resolvetoErrorObject instanceof Error) {
        throw resolvetoErrorObject
      }
      setUsername('')
      setPassword('')
      console.log('successful login')
    } catch (err) {
      setUsername('')
      setPassword('')
      setMessage('login failed ja', 'error', 5)
    }
  }

  const handleLogout = () => {
    resetUser()
    navigate('/login')
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
      likeBlogMutation.mutate(id)
    } catch(exception) {
      // console.log(exception)
    }
  }

  const removeAblog = async (id, blog) => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      try {
        removeBlogMutataion.mutate(id)
      } catch(exception) {
        // console.log(exception)
        // const errorMessage = exception.response.data.error
        // if (errorMessage === 'jwt expired') {
        //   setMessage('login session expired, please login again', 'error', 5)
        //   window.localStorage.removeItem('loggedBloglistUser')
        //   resetUser()
        // } else {
        //   console.log(exception.response)
        // }
      }

    }
  }

  const handleAddedComment = async (blogId, object) => {
    try {
     addCommentMutation.mutate({ blogId, object })
    } catch(exception) {
      // console.log(exception)
    }
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>  
  }


  const padding ={ padding : 5 }
  const navBar = { backgroundColor: 'lightgrey'}
  return (
    <div>
      
      <div style={navBar} >
        <Link style={padding} to='/'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
        {user &&
           <MainLoggedIn 
              user={user}
              handleLogout={handleLogout}
            />
        }
      </div>
      <h1>Blogs</h1>
        
      <Notification/>

      <Routes> 
        <Route path='*' element={<Navigate replace to ='/blogs' />} />
        <Route path='/blogs' element={user 
          ? <BlogsSimpleVersion 
              blogs={blogs}
              passedRef={blogFormRef}
              handleAddBlog={handleAddBlog} 
            /> 
          : <Navigate replace to ='/login' /> }  
        />
        <Route path='/blogs/:id' element={
          <BlogSimpleVersion
            blogs={blogs}
            handleLike={likeABlog}
            handleDelete={removeAblog}
            handleAddedComment={handleAddedComment}
          />} 
        />

        <Route path='/users' element={user ? <Users/> : <Navigate replace to ='/login'/>} />
        <Route path='/users/:id' element={
          <User 
            blogs={blogs}
            passedRef={blogFormRef}
            handleAddBlog={handleAddBlog} 
          />
        } />
        <Route path='/login' element={
            <LoginForm
              handleLogin={handleLogin}
              handleOnChangeUsername={handleOnChangeUsername}
              handleOnChangePassword={handleOnChangePassword}
              username={username}
              password={password}
            />

        } />

        <Route path='/' element={user
          ? <Navigate replace to ='/blogs' /> 
          : <div>
              <p>
              worth reading blogs
              </p>
              <LoginForm
                handleLogin={handleLogin}
                handleOnChangeUsername={handleOnChangeUsername}
                handleOnChangePassword={handleOnChangePassword}
                username={username}
                password={password}
              />

          </div>
        } />

      </Routes>

    </div>
  )
}

export default App