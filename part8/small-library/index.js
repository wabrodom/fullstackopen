const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const config = require('./utils/config')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/Author')
const Book = require('./models/Book')

console.log('connectign to ... ')
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('connected to mongdoDB'))
  .catch((error) => {
    console.log('error connect to mongoDB', error.message)
  } )


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
  type Author {
    name: String!
    born: Int
  }

  type Book {
    title: String!
    author: Author!
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


const resolvers = {

  Book: {
    author: (root) => {
      return {
        name: root.author.name,
        born: root.author.born
      }
    }
  },

  Query: {

    bookCount: async () => Book.collection.countDocuments(),

    authorCount: async() => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      if (!args.author) {
        const allBooksPopulated = await Book.find({}).populate('author')
        return allBooksPopulated
      }

      const authorId = await Author.findOne({ name : args.author })._id
      console.log(authorId)
      const authorBooks = await Book.find({ author : authorId }).populate('author')
      return authorBooks
    },

    allAuthors: async () => {
      return Author.find({})
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const theAuthor = await Author.findOne({ name: args.author })

      if ( !theAuthor ) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()

        const book = new Book({ ...args, author: newAuthor._id })
        const retunedBook = await book.save()
        const populated = await retunedBook.populate('author')
        return populated
      }

      const book = new Book({ ...args, author: theAuthor._id })
      const returnedBook = await book.save()
      const populated = await returnedBook.populate('author')

      console.log(populated, "vs")
      console.log(populated.author.name)
      return populated
    },


    editAuthor: async (root, args) => {
      const authorToEdit = await Author.findOne( { name: args.author })

      if (!authorToEdit) {
        return null
      }
      authorToEdit.born = args.setBornTo
      await authorToEdit.save()

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