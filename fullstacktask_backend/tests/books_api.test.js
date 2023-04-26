const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Book = require('../models/book')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Book.deleteMany({})

  const bookObjects = helper.initialBooks.map((book) => new Book(book))
  const promiseArray = bookObjects.map((book) => book.save())
  await Promise.all(promiseArray)
})

describe('/api/books tests', () => {

  test('all books are returned', async () => {
    const response = await api.get('/api/books')

    expect(response.body).toHaveLength(helper.initialBooks.length)
  })

  test('unique identifier property of the book is named id', async () => {
    const response = await api.get('/api/books')
    expect(response.body[0].id).toBeDefined()
  })

  test('a book cannot be created without description', async () => {
    const newBook = {
      title: 'The Hitchhiker\'s Guide to the Galaxy',
      author: 'Douglas Adams',
    }

    await api
      .post('/api/books')
      .send(newBook)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('a book can be deleted', async () => {
    const newBook = {
      title: 'Men Explain Things to Me',
      author: 'Rebecca Solnit',
      description: 'launched the term mansplaining',
    }

    const bookResponse = await api
      .post('/api/books')
      .send(newBook)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const books = await helper.booksInDb()
    expect(books).toHaveLength(3)

    await api
      .delete(`/api/books/${bookResponse.body.id}`)
      .expect(204)

    const booksAtEnd = await helper.booksInDb()

    expect(booksAtEnd).toHaveLength(2)
  })

  test('a book can be updated', async () => {
    const newBook = {
      title: 'Men Explain Things to Me',
      author: 'Rebecca Solnit',
      description: 'launched the term mansplaining',
    }

    await api
      .post('/api/books')
      .send(newBook)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const booksAtEnd = await helper.booksInDb()
    expect(booksAtEnd[booksAtEnd.length - 1].description).toBe('launched the term mansplaining')

    const newBookUpdate = {
      title: 'Men Explain Things to Me',
      author: 'Rebecca Solnit',
      description: 'Each chapter is a separate essay, from various years, that sums up one key aspect of the world of women under patriarchy.',
    }

    await api
      .put(`/api/books/${booksAtEnd[booksAtEnd.length - 1].id}`)
      .send(newBookUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const booksAtEndAfterUpdate = await helper.booksInDb()
    expect(
      booksAtEndAfterUpdate[booksAtEndAfterUpdate.length - 1].description
    ).toBe('Each chapter is a separate essay, from various years, that sums up one key aspect of the world of women under patriarchy.')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
