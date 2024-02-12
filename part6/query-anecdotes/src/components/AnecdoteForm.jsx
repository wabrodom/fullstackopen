import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'
import  { useNotificationDispatch }  from './NotificationContext'

const AnecdoteForm = () => {
  const nearestQueryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = nearestQueryClient.getQueryData(['anecdotes'])
      nearestQueryClient.setQueriesData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      const errorData = error.response.data.error
      dispatch({ type: 'error', payload: errorData })
      setTimeout(()=> dispatch({ type: 'reset' }), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    const newAnecdote = { content , votes: 0}
    newAnecdoteMutation.mutate(newAnecdote)

    dispatch({ type: 'create', payload: newAnecdote.content })
    setTimeout(()=> dispatch({ type: 'reset' }), 5000)
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
