import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import router from './routes/ai.routes'
import { KafkaConsumer, KafkaProducer } from './utils/kafka'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/ai', router)

const PORT = process.env.PORT || 3002
KafkaProducer.initProducer()
console.log('Kafka Producer Start!')
KafkaConsumer.startConsumer()
console.log('Kafka Consumer Start!')
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`AI Service running on port ${PORT}`))
  })
  .catch((err) => console.error(err))
