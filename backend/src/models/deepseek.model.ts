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
You are a professional LeetCode code reviewer. Review the user's submission using the following structured and concise format:

1. **Code Score (0–10)**: Give a numeric score, followed by a *very short* justification (max 20 words).
2. **Issues Detected**: Identify any bugs, inefficiencies, or code smells (max 100 words, be specific and technical).
3. **Next Step Only**: Suggest exactly one next step to improve or debug the code — do not reveal full answers or code (max 100 words, no code, only concise clue-style advice).

### Problem:
${title}

### Code:
\`\`\`javascript
${code}
\`\`\`
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

const analyzeProblem = async (title: string, content: string) => {
  const prompt = `
  You are a LeetCode assistant that helps users understand algorithm problems.

  Analyze the following problem description and explain it clearly to a student who has intermediate-level programming skills.

  Your output must include:

  1. **Problem Summary**: A concise rephrasing of what the problem is asking.
  2. **Constraints and Edge Cases**: What are the important constraints and any tricky edge cases to consider?
  3. **Core Requirement**: What is the essence of the problem — what kind of algorithm is likely needed? (e.g. sliding window, greedy, DP)
  4. **Clarification Example**: Take one sample input and walk through it step by step.

  Do **not** provide the solution or hints toward solving it — just explain the problem.

  ### Problem Description:
  ${content}
  `
  const response = createChat(prompt)
  return response
}
const deepseek = {
  getAnswerByDeepseek,
  evaluateCodeWithDeepseek,
  analyzeProblem,
}
export default deepseek
