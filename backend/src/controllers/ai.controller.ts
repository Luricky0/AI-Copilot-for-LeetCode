import { Request, Response } from 'express'
import AIService from '../services/ai.service'
import { ApiError } from '../utils/ApiError'
import { UserService } from '../services/user.service'
import { SubmissionSevice } from '../services/submission.service'
import { Types } from 'mongoose'

export const evaluateCode = async (req: Request, res: Response) => {
  const { title, code, model } = req.body
  try {
    if (model) {
      const aiRes = await AIService.evaluateCode(title, code, model)
      res.status(200).json({
        message: aiRes,
      })
    } else {
      const aiRes = await AIService.evaluateCode(title, code)
      res.status(200).json({
        message: aiRes,
      })
    }
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error)
      res.status(error.statusCode).json(error.message)
    }
  }
}

export const getAnswer = async (req: Request, res: Response) => {
  const { title, content, lang, model } = req.body
  try {
    if (model) {
      const aiRes = await AIService.getAnswer(title, content, lang)
      res.status(200).json({
        message: aiRes,
      })
    } else {
      const aiRes = await AIService.getAnswer(title, content, lang, model)
      res.status(200).json({
        message: aiRes,
      })
    }
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error)
      res.status(error.statusCode).json(error.message)
    }
  }
}

export const getAnalyzation = async (req: Request, res: Response) => {
  const { title, content, model, problemId } = req.body
  try {
    const user = await UserService.getUserByToken(req)
    if (user)
      await SubmissionSevice.addOneSubmission(
        user._id,
        new Types.ObjectId(problemId),
        content
      )
    if (model) {
      const aiRes = await AIService.analyzeProblem(title, content, model)
      res.status(200).json({
        message: aiRes,
      })
    } else {
      const aiRes = await AIService.analyzeProblem(title, content)
      res.status(200).json({
        message: aiRes,
      })
    }
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error)
      res.status(error.statusCode).json(error.message)
    }
  }
}
