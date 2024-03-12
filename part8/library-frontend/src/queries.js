import { gql } from "@apollo/client"



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