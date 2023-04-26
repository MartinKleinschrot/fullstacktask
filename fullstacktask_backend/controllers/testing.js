const testingRouter = require('express').Router()
const Book = require('../models/book')

testingRouter.post('/reset', async (response) => {
  await Book.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter
