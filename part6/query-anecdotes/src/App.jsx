import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Vote from './components/Vote'
import { useQuery } from '@tanstack/react-query'
import { getAll } from './request'

const App = () => {

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
          <Vote anecdote={anecdote} />
        </div>
      )}
    </div>
  )
}

export default App
