import { format, isValid } from 'date-fns'
import { isNumeric } from 'validator'

type DateFormatType = 'date' | 'time' | 'datetime'
type MyDate = Date | string | number | null | undefined
export const formatDate = (date: MyDate, type: DateFormatType = 'datetime') => {
  if (!date) return 'Date Missing'
  if (typeof date === 'string' && isNumeric(date)) date = parseInt(date)
  date = new Date(date)
  const formatRegex = type === 'date' ? 'PP' : type === 'time' ? 'p' : 'PPp'
  return isValid(date) ? format(date as Date, formatRegex) : 'Invalid Date'
}
