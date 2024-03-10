import { 
  BrowserRouter as Router,
  Routes, Route, Link,
  useNavigate,
} from 'react-router-dom'
import { useState } from 'react'
import Login from './components/Login'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'

import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_BOOKS } from './queries';

const App = () => {
  const [errorMessage , setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const result = useQuery(ALL_BOOKS)

  const notify  = message => {
    setErrorMessage(message)
    setTimeout(()=> {
      setErrorMessage('')
    }, 5000)
  }

  const logOut = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()

  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const allBooks = result.data.allBooks


  const authorMap  = (books) => {
    const map = new Map()
    for (let book of books) {
      const currentAuthor = book.author.name
      const currentCount = map.get(currentAuthor) || 0
      map.set(currentAuthor, currentCount + 1)
    }
    return map
  }
  const getAuthorAndBookCount =() => {
    const map = authorMap(allBooks)
    const authorsAndBooks = []
    for (let pair of map.entries()) {
      const currentAuthor = { name: pair[0], bookCount: pair[1] }
      authorsAndBooks.push(currentAuthor)
    }
    return authorsAndBooks
  }

  const authorAndBookCount = getAuthorAndBookCount()

  return (
    <Router>
      <div>
        <div>
          <Link to='/'>
            <button>
              authors
            </button>
          </Link>
    
          <Link to='/books'>
            <button>
              books
            </button>
          </Link>

          {token ? 
            <>
            <Link to='/add'>
              <button>
                add book
              </button>
            </Link>
            <button onClick={logOut}>log out</button>
            </>
          :
            <Link to='/login'>
              <button> 
                login
              </button>
            </Link>
          }
        </div>

        
        <Routes>
          <Route path='/' element={<Authors setError={notify} authorAndBookCount={authorAndBookCount}/>} />
          <Route path='/books' element={<Books/>} />
          <Route path='/add' element={token && <NewBook/>} />
          <Route path='/login' element={<Login setToken={setToken} setError={notify} />} />
        </Routes>
        <Notification message={errorMessage}/>
      </div>

    </Router>
  )
}

export default App