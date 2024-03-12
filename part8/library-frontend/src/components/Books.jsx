import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import GenreDisplay from './GenreDisplay'


const Books = () => {
  const [genre, setGenre] = useState(null)
  const [allGenres, setAllGenres] = useState(null)

  const result = useQuery(ALL_BOOKS)
  const resultFilter = useQuery(ALL_BOOKS, {
    variables: { genre }, 
    skip: !genre
  })

  if (result.loading || resultFilter.loading) {
    return <div>loading...</div>
  }

  console.log(resultFilter.data)
  const allBooksFiltered = resultFilter.data.allBooks


  const allGenresHelper = (books) => {
    const set = new Set()
    for (let book of books) {
      const currentGenres = book.genres
      set.add(...currentGenres)
    }
    return [...set]
  }

  if (!genre) {
    setAllGenres(allGenresHelper(allBooksFiltered))
  }

  return (
    <div>
      <h2>books</h2>
      <GenreDisplay genres={allGenres} setGenre={setGenre} />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooksFiltered.map((a) => (
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