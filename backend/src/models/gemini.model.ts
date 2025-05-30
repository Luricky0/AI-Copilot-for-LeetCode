import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv'

dotenv.config()

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
const geminiModel = ai.models

const evaluateCodeWithGemini = async (title: string, code: string) => {
  const prompt = `
  You are a LeetCode code review assistant. Please analyze the user's submission in the following structured format:
  1. Code score (out of 10), with a brief justification (no more than 20 words);
  2. Identified issues (concise and specific, no more than 100 words);
  3. Suggestions for improvement (clear next steps in words, do not provide codes, just clues, no more than 100 words);
  Problem: ${title}
  Code:
  ${code}
  `
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
      throw err
    }
  }
}

const getAnswerByGemini = async (title:string,content:string) => {
  const prompt=`Could you tell me the answer of this leetcode question? 
    The details are as follows(Ignore the html marks)
    Title: ${title}
    Content: ${content}
    `
    let retries = 3
    while(retries--){
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
        throw err
      }
    }
}

const gemini = {
  evaluateCodeWithGemini,
  getAnswerByGemini
}
export default gemini
