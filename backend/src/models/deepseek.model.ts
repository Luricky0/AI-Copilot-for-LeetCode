import OpenAI from 'openai'
import dotenv from 'dotenv'
import { ApiError } from '../utils/ApiError'
dotenv.config()

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
})

const createChat = async (prompt: string) => {
  let retries = 3
  while (retries--) {
    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: 'system', content: prompt }],
        model: 'deepseek-chat',
      })
      return response.choices[0].message.content
    } catch (err: any) {
      if (err.status === 503 && retries > 0) {
        console.warn('Deepseek overloaded. Retrying...')
        await new Promise((res) => setTimeout(res, 1000))
        continue
      }
      throw new ApiError(500,'Deepseek server error')
    }
  }
}

const deepseek = {
  createChat
}
export default deepseek
