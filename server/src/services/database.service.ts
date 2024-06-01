import mongoose from 'mongoose'
const mongoUri = process.env.MONGO_URI
export const connect = async () => {
  mongoose.set('strictQuery', false)
  const conn = await mongoose.connect(mongoUri)
  console.log(`🤝 MongoDB Connected`)
  return conn
}
