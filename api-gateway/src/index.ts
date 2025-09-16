import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth'
import userRouter from './routes/user'
import AIRouter from './routes/ai'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', authRouter)
app.use('/api',userRouter)
app.use('/api',AIRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`)
})
