import { Request, Response } from 'express'
import Problem from '../models/problem.model'

export const getPaginatedProblems = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const skip = (page - 1) * limit

    const [problems, totalproblems] = await Promise.all([
      Problem.find().skip(skip).limit(limit),
      Problem.countDocuments(),
    ])

    res.status(200).json({
      page,
      totalPages: Math.ceil(totalproblems / limit),
      totalproblems,
      problems,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed', error })
  }
}
