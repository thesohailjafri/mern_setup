import { Router } from 'express'
import {
  deleteBook,
  getBook,
  getBooks,
  postBook,
  putBook,
} from '../controllers/book.controller'
const bookRouter = Router()
bookRouter.route('/').get(getBooks).post(postBook)
bookRouter.route('/:_id').get(getBook).put(putBook).delete(deleteBook)

export default bookRouter
