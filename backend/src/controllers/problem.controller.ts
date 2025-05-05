import { Request, Response } from 'express'
import Problem from '../models/problem.model'
import { ObjectId } from 'mongodb'

const escapeRegex = (text: string): string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export const getPaginatedProblems = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const searchQuery = req.query.search
    const difficultyFilter = req.query.difficulty
    const skip = (page - 1) * limit

    const query: any = {}

    if (searchQuery && typeof searchQuery === 'string') {
      const fuzzy = searchQuery
        .split('')
        .map((c) => escapeRegex(c))
        .join('.*')
      query.title = { $regex: fuzzy, $options: 'i' }
    }

    if (difficultyFilter && difficultyFilter !== 'All') {
      query.difficulty = difficultyFilter
    }

    const [problems, totalproblems] = await Promise.all([
      Problem.find(query).skip(skip).limit(limit),
      Problem.countDocuments(query),
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

export const getProblem = async (req: Request, res: Response) => {
  const { problemId } = req.query
  try {
    const problem = await Problem.findById(problemId)
    if (problem) {
      res.status(200).json({
        problem,
      })
    } else {
      res.status(404).json({
        message: 'No such problem',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Sever error',
    })
  }
}
