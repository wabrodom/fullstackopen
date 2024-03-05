import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const EditAuthorBirth = ({ authors, setError }) => {
  const [year, setYear] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}],
    onError: (error) => {
      // const message = error.graphQLErrors.map(e => e.message).join('\n')
      setError('years must be numbers')
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const currentSelect = event.target.selectAuthor.value

    editAuthor({variables: { name: currentSelect, setBornTo: +year} })
  } 

  return (
    <div>
      <h3>Edit author birth year</h3>
      <form onSubmit={handleSubmit}>
        <label>
            author
          <select name='selectAuthor'>
            {authors.map(obj => {
              return (
                <option value={obj.name} key={obj.name}>
                  {obj.name}
                </option>
              )
            })}
        </select>

        </label>
        <input 
          value={year}
          onChange={({target}) => setYear(target.value)}
        />    
        <button type='submit'>update author</button>
      </form>
    </div>
  )
} 

export default EditAuthorBirth