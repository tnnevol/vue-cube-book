/**
 * 用于创建bookCity表
 * @type {*|Mongoose}
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
let counter = 1
let countedId = { type: Number, default: () => counter++ }

const bookSchema = new Schema({
  id: countedId,
  bookId: {
    type: String
  },
  pic: {
    type: String
  },
  name: {
    type: String
  },
  author: {
    type: String,
    default: '匿名'
  },
  type: {
    type: String
  },
  status: {
    type: String
  },
  content: {
    type: String
  },
  updateTime: {
    type: Number
  },
  latestChapter: {
    type: String
  },
  chapterList: {
    type: Array
  }
}, {
  autoIndex: true
})

module.exports = mongoose.model('books_cities', bookSchema)
