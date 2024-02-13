import { useState } from 'react'
import {
  Routes, Route,
  useMatch
} from 'react-router-dom'

import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'
import About from './components/About'
import Footer from './components/Footer'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`Created ${anecdote.content}`)
    setTimeout(()=> setNotification(null), 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    
    setNotification(`Voted for '${anecdote.content}'`)
    setTimeout(()=> setNotification(null), 5000)
  }

  const matchPath = useMatch('/anecdotes/:idd')
  const matchAnecdote = matchPath ? anecdotes.find(obj => obj.id === Number(matchPath.params.idd) ) : null

  return (

    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />

      <Routes>
        <Route path='/' element={
          <AnecdoteList anecdotes={anecdotes} vote={vote} />
        } />
        <Route path='/anecdotes/:idd' element={<Anecdote anecdote={matchAnecdote}/>} />
        <Route path='/about' element={ <About /> } />
        <Route path='/create' element={ <CreateNew addNew={addNew} /> } />

      </Routes>

      <Footer />
    </div>
  )
}

export default App
