// src/index.ts
import express from 'express'
import connectDB from './config/db'
import problemRoutes from './routes/problem.routes'
import userRoutes from './routes/user.routes'
import aiRoutes from './routes/ai.routes'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const { setGlobalDispatcher, ProxyAgent } = require('undici')
const dispatcher = new ProxyAgent({
  uri: new URL('http://127.0.0.1:7890').toString(),
})

setGlobalDispatcher(dispatcher)

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
app.use('/api', problemRoutes)
app.use('/api', userRoutes)
app.use('/api', aiRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
