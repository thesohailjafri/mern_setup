import { format } from 'date-fns'

export const generateRandomStr = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export const generateId = () => {
  const dateStr = format(new Date(), 'yyMMdd')
  const randomStr = generateRandomStr(6)
  const id = `${dateStr}-${randomStr}`
  return id
}

export const generateDocId = {
  author: () => `AUTHOR-${generateId()}`,
  book: () => `BOOK-${generateId()}`,
}
