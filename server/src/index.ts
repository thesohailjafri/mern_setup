import dotenv from 'dotenv'
dotenv.config()
// *** IMPORTS *** //
import 'express-async-errors'
import cors from 'cors'
import express from 'express'
import errorHandingMiddleware from './middlewares/error.handling.middleware'
import apiRoutes from './routes/api.routes'
import { connect } from './services/database.service'
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/', apiRoutes())
const port = process.env.PORT || 4000
app.use(errorHandingMiddleware)
const start = async () => {
  try {
    await connect()
    app.listen({ port }, () => {
      console.log(`🚀 Server Thrusting @ http://localhost:${port}`)
    })
  } catch (error) {
    console.log({
      error,
    })
  }
}
start()
