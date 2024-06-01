import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Author from '../models/author.model'
import zod from 'zod'

const authorZodSchema = zod.object({
  name: zod.string().min(3).max(255).trim(),
  email: zod.string().trim().toLowerCase().email(),
})
export const getAuthors = async (req: Request, res: Response) => {
  const authors = await Author.find()
  return res.status(StatusCodes.OK).json(authors)
}
export const postAuthor = async (req: Request, res: Response) => {
  let input: any = {}
  try {
    input = authorZodSchema.parse(req.body)
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid input. Please check your input and try again.',
    })
  }
  const author = await Author.create(input)
  return res.status(StatusCodes.CREATED).json(author)
}

export const getAuthor = async (req: Request, res: Response) => {
  const { _id } = req.params
  const author = await Author.findById(_id)
  if (!author) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Author not found.',
    })
  }
  return res.status(StatusCodes.OK).json(author)
}
export const putAuthor = async (req: Request, res: Response) => {
  let input: any = {}
  try {
    input = authorZodSchema.parse(req.body)
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid input. Please check your input and try again.',
    })
  }
  const { _id } = req.params
  const author = await Author.findByIdAndUpdate(_id, input, { new: true })
  if (!author) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Author not found.',
    })
  }
  return res.status(StatusCodes.OK).json(author)
}
export const deleteAuthor = async (req: Request, res: Response) => {
  const { _id } = req.params
  const author = await Author.findByIdAndDelete(_id)
  if (!author) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Author not found.',
    })
  }
  return res.status(StatusCodes.OK).json({
    message: 'Author deleted successfully.',
    _id: _id,
  })
}
