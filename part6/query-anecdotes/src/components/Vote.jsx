import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../request'
import { useNotificationDispatch } from './NotificationContext'

const Vote = ( { anecdote } ) => {
  const nearestQueryClient = useQueryClient()
  const notifyWith = useNotificationDispatch()

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (successfulPutObject) => {
      const currentAnecdotesState = nearestQueryClient.getQueryData(['anecdotes'])

      nearestQueryClient.setQueryData(['anecdotes'], () => {
        return currentAnecdotesState
          .map(anecdote => anecdote.id !== successfulPutObject.id ? anecdote : successfulPutObject)
      })
      // // or normal PUT then client send GET request to update new state
      // nearestQueryClient.invalidateQueries({ queryKey: ['anecdotes']})
    }
  })

  const handleVote = (anecdote) => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    voteMutation.mutate(newAnecdote)

    notifyWith(`Anecdote ' ${newAnecdote.content} ' voted`)
  }
  
  return (
    <div>
      has {anecdote.votes}
      <button onClick={() => handleVote(anecdote)}>vote</button>
    </div>
  )
}

export default Vote