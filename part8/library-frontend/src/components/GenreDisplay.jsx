const GenreDisplay = ( {genres, setGenre} ) => {

  const selectGenre = (event) => {
    setGenre( event.target.value )
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