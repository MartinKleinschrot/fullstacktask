const Book = require('../models/book')

const initialBooks = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Lord of the Rings',
    author: 'J. R. R. Tolkien',
    description: 'Great fantasy book',
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f7',
    title: 'Sleeping Giants',
    author: 'Sylvain Neuvel',
    description: 'Great sci-fi novel',
    __v: 0,
  },
]

const booksInDb = async () => {
  const books = await Book.find({})
  return books.map((book) => book.toJSON())
}

module.exports = {
  initialBooks,
  booksInDb,
}
