import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import GenreDisplay from './GenreDisplay'


const Books = () => {
  const [genre, setGenre] = useState(null)

  const resultFilter = useQuery(ALL_BOOKS, {
    variables: { genre }, 
  })

  if (resultFilter.loading) {
    return <div>loading...</div>
  }

  const allBooksFiltered = resultFilter.data.allBooks


  return (
    <div>
      <h2>books</h2>
      <GenreDisplay setGenre={setGenre} />
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooksFiltered.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books