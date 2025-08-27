import { Kafka } from 'kafkajs'
import AIService from '../services/ai.service'
import { redis } from './reddis'

const kafka = new Kafka({
  clientId: 'code-evaluator',
  brokers: ['kafka:9092'],
})

const producer = kafka.producer()

const initProducer = async () => {
  await producer.connect()
}

const sendCodeEvaluationRequest = async (
  title: string,
  code: string,
  model = 'deepseek',
  embeddings: number[][] = [[]],
  requestId: string
) => {
  const message = {
    title,
    code,
    model,
    embeddings,
    requestId,
  }
  await producer.send({
    topic: 'code-evaluation',
    messages: [{ value: JSON.stringify(message) }],
  })
}

export const KafkaProducer = {
  initProducer,
  sendCodeEvaluationRequest,
}

const consumer = kafka.consumer({ groupId: 'code-evaluator-group' })

const startConsumer = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'code-evaluation', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const payload = JSON.parse(message.value!.toString())
      console.log('Received message:', payload)

      const { title, code, model, embeddings, requestId } = payload

      // const result = await AIService.evaluateCode(
      //   title,
      //   code,
      //   model,
      //   embeddings
      // )
      const result = { status: 'ok', data: 'yesyesyes' }
      redis.set(requestId, JSON.stringify(result), 'EX', 300)
      console.log('Evaluation result:', result)
    },
  })
}

export const KafkaConsumer = {
  startConsumer,
}
