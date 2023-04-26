const booksRouter = require('express').Router()
const Book = require('../models/book')

// get all books
booksRouter.get('/', async (request, response) => {
  const books = await Book.find({})
  response.json(books)
})

// add new book
booksRouter.post('/', async (request, response) => {
  const body = request.body

  const book = new Book({
    title: body.title,
    author: body.author,
    description: body.description,
  })

  const savedBook = await book.save()
  response.status(201).json(savedBook)
})

// delete book by id
booksRouter.delete('/:id', async (request, response) => {
  await Book.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// update book information
booksRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const book = {
    title: body.title,
    author: body.author,
    description: body.description,
  }

  Book.findByIdAndUpdate(request.params.id, book, { new: true })
    .then((updatedBook) => {
      response.json(updatedBook)
    })
    .catch((error) => next(error))
})

// get book by id
booksRouter.get('/:id', async (request, response) => {
  const book = await Book.findById(request.params.id)
  response.json(book)
})

module.exports = booksRouter
