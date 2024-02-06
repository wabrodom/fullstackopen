import { useDispatch, useSelector } from 'react-redux'
import { voteTo } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(({ filter }) => filter)
  const anecdotes = useSelector(({ anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(obj => {
      const content = obj.content.toLowerCase()
      return content.includes(filter.toLowerCase())
    })
  })

  const vote = ({ content, id }) => {
    dispatch(voteTo(id))
    dispatch(setNotification(`You voted '${content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id} className='anecdote'>
          <p> 
            {anecdote.content}
          </p>
          <div className='vote-count'>
            <span> has {anecdote.votes}</span>
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList