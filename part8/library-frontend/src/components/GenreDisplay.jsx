import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"


const GenreDisplay = ( { setGenre, refetch } ) => {
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const allBooks = result.data.allBooks

  const allGenresHelper = (books) => {
    const set = new Set()
    for (let book of books) {
      const currentGenres = book.genres
      if (Array.isArray(currentGenres)){
        currentGenres.forEach(elem => set.add(elem))
      } else {
        set.add(...currentGenres)
      }
    }
    return [...set]
  }

  const genres = allGenresHelper(allBooks)

  const selectGenre = (event) => { 
    setGenre(event.target.value)
    result.refetch()
  }
  const clearGenre = () => setGenre(null)

  const colorSalmon = { backgroundColor: 'salmon'}

  return (
    <div>
      Genres
      {genres.map(genre => 
        <button onClick={selectGenre} value={genre} key={genre}>
          {genre}
        </button>
      )}
      <button onClick={clearGenre} style={colorSalmon}>clear filter</button>
    </div>
  )

}

export default GenreDisplay