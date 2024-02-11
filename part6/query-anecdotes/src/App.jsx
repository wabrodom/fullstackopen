import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, updateAnecdote } from './request'

const App = () => {
  const nearestQueryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (successfulPutObject) => {
      const currentAnecdotesState = nearestQueryClient.getQueryData(['anecdotes'])
      
      nearestQueryClient.setQueryData(['anecdotes'], () => {
        return currentAnecdotesState
          .map(anecdote => anecdote.id !== successfulPutObject.id ? anecdote : successfulPutObject)
      })
      // //or
      // nearestQueryClient.invalidateQueries({ queryKey: ['anecdotes']})
    }


  })

  
  const handleVote = (anecdote) => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    voteMutation.mutate(newAnecdote)

  }

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAll,
      retry: 1,
      refetchOnWindowFocus: false
    }
  )

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isFetching && result.isPending) {
    return <span>Fetching and Loading...</span>
  }

  if (result.error) {
    return   (
      <p>
        anecdote service is not availble due to problems in server.
      </p>
    )
  }

  const anecdotes = result.data



  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
