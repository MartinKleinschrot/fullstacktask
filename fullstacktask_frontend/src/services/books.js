import axios from 'axios'
const baseUrl = '/api/books'

const getAllBooks = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const addBook = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const updateBook = (newObject) => {
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return request.then((response) => response.data)
}

const deleteBook = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const getBook = (id) => {
  const requesturl = (`${baseUrl}/${id}`)
  const request = axios.get(requesturl)
  return request.then((response) => {
    return response.data
  })
}

const bookService = { getAllBooks, addBook, updateBook, deleteBook, getBook }

export default bookService