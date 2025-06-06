import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv'
import { ApiError } from '../utils/ApiError'

dotenv.config()

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
const geminiModel = ai.models

const createChat = async (prompt: string) => {
  let retries = 3
  while (retries--) {
    try {
      const response = await geminiModel.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      })
      return await response.text
    } catch (err: any) {
      if (err.status === 503 && retries > 0) {
        console.warn('Gemini overloaded. Retrying...')
        await new Promise((res) => setTimeout(res, 1000))
        continue
      }
      throw new ApiError(500,'Gemini server error')
    }
  }
}

const gemini = {
  createChat
}
export default gemini
