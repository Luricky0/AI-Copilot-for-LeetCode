import { Request, Response } from 'express'
import gemini from '../models/gemini.model'
import deepseek from '../models/deepseek.model'
import AIService from '../services/ai.service'
import { ApiError } from '../utils/ApiError'
export const evaluateCode = async (req: Request, res: Response) => {
  const { title, code } = req.body
  try {
    const aiRes = await AIService.evaluateCode(title, code)
    res.status(200).json({
      message: aiRes,
    })
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error)
      res.status(error.statusCode).json(error.message)
    }
  }
}

export const getAnswer = async (req: Request, res: Response) => {
  const { title, content, lang } = req.body
  try {
    const aiRes = await AIService.getAnswer(title, content, lang)
    res.status(200).json({
      message: aiRes,
    })
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error)
      res.status(error.statusCode).json(error.message)
    }
  }
}

export const getAnalyzation = async (req: Request, res: Response) => {
  const { title, content } = req.body
  try {
    const aiRes = await AIService.analyzeProblem(title, content)
    res.status(200).json({
      message: aiRes,
    })
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error)
      res.status(error.statusCode).json(error.message)
    }
  }
}
