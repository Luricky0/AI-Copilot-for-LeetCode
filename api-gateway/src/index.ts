import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', authRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`)
})
