import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'
import { useContext } from 'react'
import  NotificationContext  from './NotificationContext'

const AnecdoteForm = () => {
  const nearestQueryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = nearestQueryClient.getQueryData(['anecdotes'])
      nearestQueryClient.setQueriesData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    const newAnecdote = { content , votes: 0}
    newAnecdoteMutation.mutate(newAnecdote)

    notificationDispatch({ type: 'create', payload: newAnecdote.content })
    setTimeout(()=> {
      notificationDispatch( {type: 'reset'})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
