import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CustomError } from '../types/type'

const errorHandingMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err)
  let customError: CustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong. Please try again later.',
  }

  if (err.code === 'ER_DUP_ENTRY') {
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    customError.statusCode = StatusCodes.UNAUTHORIZED
    customError.message = 'Access Token Expired'
  }

  return res.status(customError.statusCode).json({
    error: customError.message,
  })
}

export default errorHandingMiddleware
