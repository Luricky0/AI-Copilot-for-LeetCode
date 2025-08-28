import { Request, Response } from 'express'
import AIService from '../services/ai.service'
import { ApiError } from '../utils/ApiError'
import { UserService } from '../services/user.service'
import { SubmissionSevice } from '../services/submission.service'
import { Types } from 'mongoose'
import { redis } from '../utils/reddis'
import { hash } from '../utils/hash'

export const evaluateCode = async (req: Request, res: Response) => {
  const { title, code, model, problemId } = req.body
  try {
    const user = await UserService.getUserByToken(req)

    if (!user) throw new ApiError(404, 'Invalid Token')

    if (user)
      await SubmissionSevice.addOneSubmission(
        user._id,
        new Types.ObjectId(problemId),
        code,
        model
      )
    const userId = user?._id

    if (userId) {
      const embedding = await SubmissionSevice.getEmbedding(userId, problemId)
      if (embedding) {
        const aiRes = await AIService.sendEvaluateCode(
          title,
          code,
          model,
          embedding
        )
        res.status(200).json(aiRes)
      } else {
        const aiRes = await AIService.sendEvaluateCode(title, code, model)
        res.status(200).json(aiRes)
      }
    } else throw new ApiError(500, 'User data broken')
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error)
      res.status(error.statusCode).json(error.message)
    }
  }
}

export const getAnswer = async (req: Request, res: Response) => {
  const { title, content, lang, model } = req.body
  const cacheKey = `llm:answer:${title}:${lang}:${model || 'default'}:${hash(
    content
  )}`

  try {
    const cached = await redis.get(cacheKey)
    if (cached) {
      return res.status(200).json({
        message: cached,
        source: 'cache',
      })
    }
    if (model) {
      const aiRes = await AIService.getAnswer(title, content, lang, model)
      await redis.set(cacheKey, aiRes!, 'EX', 3600)
      res.status(200).json({
        message: aiRes,
      })
    } else {
      const aiRes = await AIService.getAnswer(title, content, lang)
      await redis.set(cacheKey, aiRes!, 'EX', 3600)
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
  const cacheKey = `llm:analyzation:${title}:${model}:${hash(content)}`
  try {
    const cache = await redis.get(cacheKey)
    if (cache) {
      res.status(200).json({
        message: cache,
        source: 'cache',
      })
    }

    if (model) {
      const aiRes = await AIService.analyzeProblem(title, content, model)
      await redis.set(cacheKey, aiRes!, 'EX', 3600)
      res.status(200).json({
        message: aiRes,
      })
    } else {
      const aiRes = await AIService.analyzeProblem(title, content)
      await redis.set(cacheKey, aiRes!, 'EX', 3600)
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
