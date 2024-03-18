import { 
  Routes, Route, Link,
  Navigate
} from 'react-router-dom'
import { useState } from 'react'
import Login from './components/Login'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'

import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries';
import Recommended from './components/Recommended';

const App = () => {
  const [errorMessage , setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const result = useQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onData: ( ({ data, client }) => {
      const addedBook = data.data.bookAdded
      const title = data.data.bookAdded.title
      const author = data.data.bookAdded.author.name
      window.alert(`'${title}' by ${author} added`)

      client.cache.updateQuery({ query: ALL_BOOKS}, data => {
        return {
          allBooks: data.allBooks.concat(addedBook)
        }
      })
    })
  })

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
            <Link to='/recommended'>
              <button>
                recommended
              </button>
            </Link>
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
          <Route path='/' 
            element={<Authors setError={notify} authorAndBookCount={authorAndBookCount}/>} 
          />

          <Route path='/books' 
            element={<Books/>}
          />

          <Route path='/add' 
            element={token ? <NewBook setError={notify}/> : <Navigate replace to ='/login'/>} 
          />

          <Route path='/recommended' 
            element={token ? <Recommended/> : <Navigate replace to ='/login'/>} 
          />

          <Route path='/login' 
            element={token ? <Navigate replace to ='/add'/> : <Login setToken={setToken} setError={notify} /> } 
          />


        </Routes>
        <Notification message={errorMessage}/>
      </div>

  )
}

export default App