interface DocumentCommonAtr {
  _id: string
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthorDocument extends DocumentCommonAtr {
  name: string
  email: string
}

export interface BookDocument extends DocumentCommonAtr {
  title: string
  description: string
  price: number
  volume: number
  publicationDate: Date
  publicationPlace: string
  publisher: string
  author: AuthorDocument
}
