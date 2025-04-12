// src/index.ts
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'
import questionRoutes from './routes/question.routes'
import cors from 'cors'

dotenv.config() // 加载.env文件中的变量

const app = express()
const PORT = process.env.PORT || 5000
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(express.json())
connectDB()

app.get('/', (req, res) => {
  res.send('API is running...')
})
app.use('/api', questionRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
