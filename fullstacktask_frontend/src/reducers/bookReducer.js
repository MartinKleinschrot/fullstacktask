import { createSlice } from '@reduxjs/toolkit'
import bookService from '../services/books'

const initialState = []

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action) {
      state = action.payload
      return state
    },
    removeBook(state) {
      state = ''
      return state
    },
    getBook(state) {
      return state
    }
  }
})

export const initializeBooks = () => {
  return async dispatch => {
    const books = await bookService.getAllBooks()
    dispatch(setBooks(books))
  }
}

export const { setBooks, removeBook, getBook } = bookSlice.actions
export default bookSlice.reducer