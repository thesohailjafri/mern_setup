import { Router } from 'express'
import {
  deleteAuthor,
  getAuthor,
  getAuthors,
  postAuthor,
  putAuthor,
} from '../controllers/author.controller'
const authorRouter = Router()
authorRouter.route('/').get(getAuthors).post(postAuthor)
authorRouter.route('/:_id').get(getAuthor).put(putAuthor).delete(deleteAuthor)

export default authorRouter
