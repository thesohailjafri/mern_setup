import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Book from '../models/book.model'
import zod from 'zod'

const bookZodSchema = zod.object({
  name: zod.string().min(3).max(255).trim(),
  email: zod.string().trim().toLowerCase().email(),
})
export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.find()
  return res.status(StatusCodes.OK).json(books)
}
export const postBook = async (req: Request, res: Response) => {
  let input: any = {}
  try {
    input = bookZodSchema.parse(req.body)
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid input. Please check your input and try again.',
    })
  }
  const book = await Book.create(input)
  return res.status(StatusCodes.CREATED).json(book)
}

export const getBook = async (req: Request, res: Response) => {
  const { _id } = req.params
  const book = await Book.findById(_id)
  if (!book) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Book not found.',
    })
  }
  return res.status(StatusCodes.OK).json(book)
}
export const putBook = async (req: Request, res: Response) => {
  let input: any = {}
  try {
    input = bookZodSchema.parse(req.body)
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid input. Please check your input and try again.',
    })
  }
  const { _id } = req.params
  const book = await Book.findByIdAndUpdate(_id, input, { new: true })
  if (!book) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Book not found.',
    })
  }
  return res.status(StatusCodes.OK).json(book)
}
export const deleteBook = async (req: Request, res: Response) => {
  const { _id } = req.params
  const book = await Book.findByIdAndDelete(_id)
  if (!book) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Book not found.',
    })
  }
  return res.status(StatusCodes.OK).json({
    message: 'Book deleted successfully.',
    _id: _id,
  })
}
