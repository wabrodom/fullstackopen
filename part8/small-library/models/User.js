const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    minLength: 3
  },
  favoriteGenre: {
    type: String,
    require: true,
    default: 'memoir',
    minLengh: 3
  }
})

schema.plugin(uniqueValidator)


module.exports = mongoose.model('User', schema)