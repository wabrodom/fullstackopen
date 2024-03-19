import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

import EditAuthorBirth from './EditAuthorBirth'

const Authors = ({ setError, authorAndBookCount }) => {
  const result = useQuery(ALL_AUTHORS)


  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  // const authorBookCount = (array, name) => {
  //   const foundAuthor = array.find(obj => obj.name === name)

  //   return foundAuthor.bookCount
  // } 

  return (
    <div>
      <h2>authors</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <EditAuthorBirth authors={authors} setError={setError}/>
    </div>
  )
}

export default Authors