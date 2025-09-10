import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import router from './routes/auth'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth', router)

const PORT = process.env.PORT || 3001

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`))
  })
  .catch((err) => console.error(err))
