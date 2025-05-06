import { Request, Response } from 'express'
import gemini from '../models/gemini.model'
import deepseek from '../models/deepseek.model'
export const evaluateCode = async (req: Request, res: Response) => {
  const { title, code } = req.body
  try {
    const aiRes = await deepseek.evaluateCodeWithDeepseek(title, code)
    res.status(200).json({
      message: aiRes,
    })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

export const getAnswer = async (req: Request, res: Response) => {
  const { title, content, lang } = req.body
  try {
    const aiRes = await deepseek.getAnswerByDeepseek(title, content, lang)
    res.status(200).json({
      message: aiRes,
    })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}
