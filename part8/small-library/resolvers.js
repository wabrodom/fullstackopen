const { GraphQLError } = require('graphql')
const jwt =require('jsonwebtoken')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

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

module.exports = resolvers