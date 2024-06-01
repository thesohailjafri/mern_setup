import { Model, Schema, model } from 'mongoose'
import { BookDocument } from '../types/document'
import { generateDocId } from '../utils/generate.util'

export interface BookDoc extends BookDocument {}

interface BookModel extends Model<BookDoc> {}

const BookSchema = new Schema<BookDoc>(
  {
    id: {
      type: String,
      required: true,
      default: generateDocId.book(),
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    publicationPlace: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Book = model<BookDoc, BookModel>('Book', BookSchema)
export default Book
