import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      born
    }
    published
    genres
    id
  }
`

export const LOGIN = gql`
  mutation($username: String!, $password: String!){
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ALL_AUTHORS = gql`
  query{
    allAuthors {
      name
      born
      books {
        title
      }
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author {
        name
        born
      }
      genres
      published
      id
    }
  }
`

export const ALL_AUTHOR_BOOKS = gql`
  query($author: String) {
    allBooks(author: $author) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const  ADD_BOOK = gql`
mutation(
  $title: String!, 
  $author: String!, 
  $published: Int!, 
  $genres: [String!]!){
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    author {
      name
      born
    }
    published
    genres
    id
  }
}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      username
      id
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`