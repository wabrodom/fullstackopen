import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import GenreDisplay from './GenreDisplay'


const Books = () => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)
  if (result.loading) {
    return <div>loading...</div>
  }

  const allBooks = result.data.allBooks

  const filterBooks = genre ? allBooks.filter(b => b.genres.includes(genre)) : allBooks

  return (
    <div>
      <h2>books</h2>
      <GenreDisplay books={allBooks} setGenre={setGenre} />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books