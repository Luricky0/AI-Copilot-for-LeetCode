import { Kafka } from 'kafkajs'
import AIService from '../services/ai.service'

const kafka = new Kafka({
  clientId: 'code-evaluator',
  brokers: ['localhost:9092'],
})

const producer = kafka.producer()

const initProducer = async () => {
  await producer.connect() // 启动时连接一次
}

const sendCodeEvaluationRequest = async (
  title: string,
  code: string,
  model = 'deepseek',
  embeddings: number[][] = [[]]
) => {
  const message = {
    title,
    code,
    model,
    embeddings,
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

      const { title, code, model, embeddings } = payload

      const result = await AIService.evaluateCode(
        title,
        code,
        model,
        embeddings
      )
      console.log('Evaluation result:', result)
    },
  })
}

export const KafkaConsumer = {
  startConsumer,
}
