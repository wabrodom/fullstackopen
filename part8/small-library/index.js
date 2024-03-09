const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const config = require('./utils/config')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
    me: User
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
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
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
      if (!args.author && !args.genre) {
        const allBooksPopulated = await Book.find({}).populate('author')
        return allBooksPopulated
      }
      if (args.author && !args.genre) {
        const foundAuthor = await Author.findOne({ name : args.author })
        const authorBooks = await Book.find({ author : foundAuthor._id }).populate('author')
        return authorBooks
      }
      if (!args.author && args.genre ) {
        const matchGenre = await Book.find({ genres: args.genre }).populate('author')
        return matchGenre
      }

      const matchAuthor = await Author.findOne({ name : args.author })
      const matchAuthorAndGenre = await Book.find({ author : matchAuthor._id })
        .find({ genres: args.genre }).populate('author')

      return matchAuthorAndGenre
    },

    allAuthors: async () => {
      return Author.find({})
    },

    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if ( !currentUser) { 
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const duplicatedName = await Book.findOne({ title: args.title })

      if (duplicatedName) {
        throw new GraphQLError('book name must be unqiue', {
          extensions: {
            code: 'BAD_USER_INPUT',
            inValidArgs: args.title
          }
        })
      }

      const foundAuthor = await Author.findOne({ name: args.author })

      if ( !foundAuthor ) {
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new GraphQLError('new author name saved failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              inValidArgs: args.author,
              error
            }
          })
        }

        const book = new Book({ ...args, author: newAuthor._id })

        try {
          await book.save()
        } catch (error) {
          throw new GraphQLError('save book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              inValidArgs: args,
              error
            }
          })
        }

        const populated = await book.populate('author')
        return populated

      }

      const book = new Book({ ...args, author: foundAuthor._id })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('save book falied, The book name is at least 5 characters', {
          extensions: {
            code: 'BAD_USER_INPUT',
            inValidArgs: args,
            error
          }
        })
      }
      const populated = await book.populate('author')

      return populated
    },


    editAuthor: async (root, args, { currentUser }) => {
      if ( !currentUser) { 
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      
      const authorToEdit = await Author.findOne( { name: args.name })
    
      if (!authorToEdit) {
        return null
      }
      // graphQL type defintion in Mutation is Int, it will check type first, if err below code will not run
      if (typeof args.setBornTo !== 'number') {
        throw new GraphQLError('the author birthyear must be a number', {
          extensions: {
            code: 'BAD_USER_INPUT',
            inValidArgs: args.setBornTo
          }
        })
      }

      authorToEdit.born = args.setBornTo
      try {
        await authorToEdit.save()
      } catch(error) {
        throw new GraphQLError('failed to change birthyear of the author', {
          extensions: {
            code: 'BAD_USER_INPUT',
            inValidArgs: args.setBornTo
          }
        })
      }

      return authorToEdit
    },

    createUser: async (root, args) => {
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre || 'self-help'
      })

      return user.save().catch(error => {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }

        })
      })

    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secretPassword') {
        throw new GraphQLError('wrong credentials' , {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const userForToken = { username: user.username, id: user._id}
      return { value: jwt.sign(userForToken, config.JWT_SECRET)}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    // have to be req, res
    const auth = req ? req.headers.authorization : null

    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
      
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }

  },


}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})