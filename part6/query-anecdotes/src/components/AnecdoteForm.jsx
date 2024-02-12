import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'
import  { useNotificationDispatch }  from './NotificationContext'

const AnecdoteForm = () => {
  const nearestQueryClient = useQueryClient()
  const notifyWith = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = nearestQueryClient.getQueryData(['anecdotes'])
      nearestQueryClient.setQueriesData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      const errorData = error.response.data.error
      notifyWith(errorData)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    const newAnecdote = { content , votes: 0}
    newAnecdoteMutation.mutate(newAnecdote)

    notifyWith(`Created '${newAnecdote.content}'`)
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
