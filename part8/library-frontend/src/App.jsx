import { 
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'

const App = () => {
  const [errorMessage , setErrorMessage] = useState(null)

  const notify  = message => {
    setErrorMessage(message)
    setTimeout(()=> {
      setErrorMessage('')
    }, 5000)
  }

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
       
          <Link to='/add'>
            <button>
              add book
            </button>
          </Link>
        </div>

        
        <Routes>
          <Route path='/' element={<Authors setError={notify}/>} />
          <Route path='/books' element={<Books/>} />
          <Route path='/add' element={<NewBook/>} />
        </Routes>
        <Notification message={errorMessage}/>
      </div>

    </Router>
  )
}

export default App