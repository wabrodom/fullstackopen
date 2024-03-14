import { useState } from "react"
import { useQuery, useLazyQuery } from "@apollo/client"
import { ALL_BOOKS, CURRENT_USER } from "../queries"

const Recommended = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState(null)
  
  useQuery(CURRENT_USER, {
    onCompleted: (data) => {
      setCurrentUser(data.me)
      getFilterBooks({ variables: { genre: data.me.favoriteGenre }})
    }
  })

  const [getFilterBooks, resultFilterBooks] = useLazyQuery(ALL_BOOKS, {
    onCompleted: (data) => setFilteredBooks(data.allBooks)
  })


  if (resultFilterBooks.loading || !currentUser || !filteredBooks) {
    return null
  } 

  resultFilterBooks.refetch()

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