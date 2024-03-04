const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type AllAuthors {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [AllAuthors!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): AllAuthors
  }

`
const authorsMap = (books) => {
  const map = new Map()
  for (let book of books) {
    const currentCount = map.get(book.author) || 0
    map.set(book.author, currentCount +1)
  }
  return map
}

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => {
      const map = authorsMap(books)
      return map.size
    },
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return books
      }
      if (!args.author && args.genre) {
        const genreBooks = books.filter(b => b.genres.includes(args.genre))
        return genreBooks
      }
      if (args.author && !args.genre) {
        const authorBooks = books.filter(b => b.author === args.author)
        return authorBooks
      }

      const authorAndGenreBooks = books.filter(b => b.author === args.author 
        && b.genres.includes(args.genre) )
      return authorAndGenreBooks
    },
    /* allAuthors: query method but have side effect to server, 
      the goal here is for authors, array of object, must have some way to remember new author
      so fetch authors info just from books is not enough, as the new author will not be added when book added
      for now to make it passed ex. I mutate server, not read only
    */
    allAuthors: () => {
      const map = authorsMap(books)
   
      for (let pair of map.entries()) {
        const currentAuthor = { name: pair[0], bookCount: pair[1] }

        const foundInAuthors = authors.find(obj => obj.name === currentAuthor.name)
        if (!foundInAuthors) {
          authors = authors.concat(currentAuthor)
        }
        authors = authors.map(obj => obj.name === currentAuthor.name
          ? {...obj, bookCount: currentAuthor.bookCount}
          : obj
          )
      }

      return authors
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      books = books.concat(book)

      const author = book.author
      const alreadyInAuthors = authors.find(obj => obj.name === author)
      if(!alreadyInAuthors) {
        const newAuthorObject ={ name: author, bookCount: 1 , id: uuid() }
        authors = authors.concat(newAuthorObject)
      }

      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(obj => obj.name === args.name)

      if (!author) {
        return null
      }

      const updateAuthor = {...author, born: args.setBornTo}
      authors = authors.map(p => p.name === author.name ? updateAuthor: p)
      return updateAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})