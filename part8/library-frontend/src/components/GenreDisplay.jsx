const GenreDisplay = ( {books} ) => {

  const allGenres = (books) => {
    const set = new Set()
    for (let book of books) {
      const currentGenres = book.genres
      set.add(...currentGenres)
    }
    return [...set]
  }

  const genres = allGenres(books)

  return (
    <div>
      Genres
      {genres.map(genre => 
        <button>
          {genre}
        </button>
      )}
    </div>
  )

}

export default GenreDisplay