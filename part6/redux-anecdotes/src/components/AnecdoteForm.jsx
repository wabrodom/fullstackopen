import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''

    const newAnecdote ={ content, votes: 0 }
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`You added ' ${content} '` , 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='newAnecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm