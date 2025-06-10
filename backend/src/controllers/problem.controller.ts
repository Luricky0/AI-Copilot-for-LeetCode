import { Request, Response } from 'express'
import Problem from '../models/problem.model'
import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import { UserService } from '../services/user.service'
import ProblemService from '../services/problem.service'
import { APIError } from 'openai'
import { ApiError } from '../utils/ApiError'

const escapeRegex = (text: string): string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export const getPaginatedProblems = async (req: Request, res: Response) => {
  const {
    page,
    limit,
    skip,
    searchQuery,
    difficultyFilter,
    likedOnly,
    completedOnly,
  } = req.body
  try {
    const user = await UserService.getUserByToken(req)
    const getPageRes = await ProblemService.getPage(
      page,
      limit,
      skip,
      searchQuery,
      difficultyFilter,
      likedOnly,
      completedOnly,
      user!
    )

    res.status(200).json(getPageRes)
  } catch (error) {
    console.log(error)
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error.message)
    }
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
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error.message)
    }
  }
}

export const getNextProblemID = async (req: Request, res: Response) => {
  const { problemId } = req.body
  const currentID = parseInt(problemId, 10)
  if (isNaN(currentID)) {
    res.status(400).json({ message: 'Invalid problemID format.' })
  }
  const nextProblemID = currentID + 1

  try {
    const nextProblem = await Problem.findOne({
      problemId: nextProblemID.toString(),
    })

    if (!nextProblem) {
      res.status(404).json({ message: 'No next problem found.' })
    } else {
      res.status(200).json({ nextProblemID: nextProblem._id })
    }
  } catch (error) {
    console.error('Error fetching next problem:', error)
    res.status(500).json({ message: 'Internal server error.' })
  }
}
