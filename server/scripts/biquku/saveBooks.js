/*
const BookCity = require('../../model/bookCity')
const axios = require('axios')
const path = require('path')

axios.get(path.resolve(__dirname, '../books/book.json'))
  .then(({ data }) => {
    const books = JSON.parse(data)
    books.forEach(({
      book_id: id,
      pic,
      name,
      author,
      type,
      status,
      content
    }) => {
      const bC = new BookCity({
        book_id,
        pic,
        name,
        author,
        type,
        status,
        content
      })
      bC.save(() => {
        console.log('存入一本书')
      })
    })
  })
*/
