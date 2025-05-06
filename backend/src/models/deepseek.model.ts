import OpenAI from 'openai'
import dotenv from 'dotenv'
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
      throw err
    }
  }
}

const evaluateCodeWithDeepseek = async (title: string, code: string) => {
  const prompt = `
  You are a LeetCode code review assistant. Please analyze the user's submission in the following structured format:
  1. Code score (out of 10), with a brief justification (no more than 20 words);
  2. Identified issues (concise and specific, no more than 100 words);
  3. Suggestions for improvement (clear next steps in words, do not provide codes, just clues, no more than 100 words);
  Problem: ${title}
  Code:
  ${code}
  `

  const response = createChat(prompt)
  return response
}

const getAnswerByDeepseek = async (
  title: string,
  content: string,
  lang: string
) => {
  const cleanedContent = content.split('Example')[0].trim()
  const prompt = `Please solve the following LeetCode problem and only return the code in ${lang}. 
    Do not include any explanation.
    Title: ${title}
    Content: ${cleanedContent}
     `

  console.log(prompt)

  const response = createChat(prompt)
  return response
}

const deepseek = {
  getAnswerByDeepseek,
  evaluateCodeWithDeepseek,
}
export default deepseek
