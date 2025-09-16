import { Request, Response } from 'express'
import { SubmissionSevice } from '../services/submission.service'
import { ApiError } from '../utils/ApiError'

export const addOneSubmission = (req: Request, res: Response) => {
  const { userId, problemId, code, model } = req.body
  try {
    SubmissionSevice.addOneSubmission(userId, problemId, code, model)
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ messsage: error.message })
    }
  }
}

export const getEmbedding = (req: Request, res: Response) => {
  const { userId, problemId } = req.body
  try {
    SubmissionSevice.getEmbedding(userId, problemId)
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ messsage: error.message })
    }
  }
}
