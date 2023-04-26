import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBooks, setBooks } from './reducers/bookReducer'
import bookService from './services/books'
import { Form, Button, ListGroup, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const dispatch = useDispatch()
  const books = useSelector(state => state.books)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [id, setId] = useState('')
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    dispatch(initializeBooks())
  }, [dispatch])

  const validateInputs = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  const onTitleChangeHandler = (event) => {
    setTitle(event.target.value)
  }

  const onAuthorChangeHandler = (event) => {
    setAuthor(event.target.value)
  }

  const onDescriptionChangeHandler = (event) => {
    setDescription(event.target.value)
  }

  const getBook = (id) => {
    bookService
      .getBook(id)
      .then((returnedBook) => {
        setTitle(returnedBook.title)
        setAuthor(returnedBook.author)
        setDescription(returnedBook.description)
        setId(returnedBook.id)
      })
      .catch(() => {
        // errorhandling could be added
      })
  }

  const updateBook = (event) => {
    validateInputs(event)
    // title, author and description required
    if (!(!title || !author || !description)) {
      const newBook = {
        title: title,
        author: author,
        description: description,
        id: id
      }

      bookService
        .updateBook(newBook)
        .then(() => {
          bookService
            .getAllBooks()
            .then((returnedBooks) => {
              dispatch(setBooks(returnedBooks))
            })
          setTitle('')
          setAuthor('')
          setDescription('')
          setId('')
        })
        .catch(() => {
          // errorhandling could be added
        })
    }
  }

  const deleteBook = () => {
    if (window.confirm(`Remove book ${title} by ${author}`)) {
      bookService
        .deleteBook(id)
        .then(() => {
          bookService
            .getAllBooks()
            .then((returnedBooks) => {
              dispatch(setBooks(returnedBooks))
            })
          setTitle('')
          setAuthor('')
          setDescription('')
          setId('')
        })
        .catch(() => {
          // errorhandling could be added
        })
    }
  }

  const addBook = (event) => {
    event.preventDefault()
    validateInputs(event)
    // title, author and description required
    if (!(!title || !author || !description)) {
      const newBook = {
        title: title,
        author: author,
        description: description,
      }

      bookService
        .addBook(newBook)
        .then((returnedBook) => {
          dispatch(setBooks(books.concat(returnedBook)))
        })
        .catch(() => {
          // errorhandling could be added
        })

      setTitle('')
      setAuthor('')
      setDescription('')
      setId('')
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form noValidate onSubmit={addBook} validated={validated}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" type="text" value={title} onChange={onTitleChangeHandler} required/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control name="author" type="text" value={author} onChange={onAuthorChangeHandler} required/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" as="textarea" rows={3} value={description} onChange={onDescriptionChangeHandler} required/>
            </Form.Group>

            <Form.Group>
              <Button variant="primary" type="submit" id="addBook" onClick={addBook}>Save New</Button>
              <Button variant="secondary" onClick={updateBook} className="btnLike" disabled={!id ? true : false}>Save</Button>
              <Button variant="secondary" onClick={deleteBook} disabled={!id ? true : false}>Delete</Button>
            </Form.Group>
          </Form>
        </Col>

        <Col>
          <h2>List of Books</h2>
          <ListGroup>
            {books.map(book => (
              <ListGroup.Item key={book.id}><Button value={book.id} variant="Light" onClick={() => getBook(book.id)}>{book.title} by {book.author}</Button></ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default App
