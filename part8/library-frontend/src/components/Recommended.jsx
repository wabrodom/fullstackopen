import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Recommended = ({ currentUser }) => {

  const resultFilterBooks = useQuery(ALL_BOOKS, {
    variables: { genre: currentUser.favoriteGenre }
  })

  console.log(currentUser.favoriteGenre)
  if (resultFilterBooks.loading) return null

  const filteredBooks = resultFilterBooks.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre {currentUser.favoriteGenre} </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map(book => {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )
          })}
       


        </tbody>
      </table>
    </div>
  )
}

export default Recommended