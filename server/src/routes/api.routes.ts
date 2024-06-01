import { Router } from 'express'
import authorRouter from './author.routes'
import bookRouter from './book.routes'

const router = Router()
const apiRoutes = () => {
  router.use('/authors', authorRouter)
  router.use('/books', bookRouter)

  return router
}

export default apiRoutes
