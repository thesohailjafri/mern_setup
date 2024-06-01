import { Model, Schema, model } from 'mongoose'
import { AuthorDocument } from '../types/document'
import { generateDocId } from '../utils/generate.util'

export interface AuthorDoc extends AuthorDocument {}
interface AuthorModel extends Model<AuthorDoc> {}
const AuthorSchema = new Schema<AuthorDoc>(
  {
    id: {
      type: String,
      required: true,
      default: generateDocId.author(),
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
)
const Author = model<AuthorDoc, AuthorModel>('Author', AuthorSchema)
export default Author