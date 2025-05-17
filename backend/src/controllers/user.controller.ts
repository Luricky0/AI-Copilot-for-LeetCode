import { Request, Response } from 'express'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Problem from '../models/problem.model'
import { ObjectId } from 'mongodb'
import user from '../models/user.model'

export const login = async (req: Request, res: Response) => {
  const { id, password } = req.body
  console.log('here!')

  try {
    const user = await User.findOne({ id })
    if (!user) {
      res.status(404).json({
        message: 'User not found',
      })
    } else {
      const isMatch = await user.comparePassword(password)
      if (!isMatch) {
        res.status(404).json({
          message: 'Invalid credentials',
        })
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '7d',
      })
      res.status(200).json({
        message: 'Login successful',
        token,
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'Server error',
    })
  }
}

export const register = async (req: Request, res: Response) => {
  const { id, password } = req.body
  try {
    const user = await User.findOne({ id })
    if (user) {
      res.status(404).json({
        message: 'User id existed',
      })
    }

    const newUser = new User({ id, password })
    await newUser.save()
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    })
    res.status(201).json({
      message: 'Register successful',
      token,
    })
  } catch (error) {
    console.error(error)
    res.status(500)
  }
}

export const likeProblem = async (req: Request, res: Response) => {
  const { problemId, title } = req.body
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(400).json({ message: 'Token is required' })
  } else {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
      const userId = decoded.id
      const user = await User.findOne({ id: userId })
      if (!user) {
        res.status(404).json({
          message: 'User not found',
        })
      } else {
        const problem = await Problem.findById(problemId)
        if (!problem) {
          res.status(404).json({
            message: 'Problem not found',
          })
        } else {
          const currentTime = Date.now()
          if (
            !user.likedProblemsIDs.some(
              (p) => p.problemId.toString() === problemId
            )
          ) {
            user.likedProblemsIDs.push({
              problemId,
              timestamp: currentTime,
              title,
            })
            await user.save()
            res.status(200).json({
              message: 'Problem liked successfully',
            })
          } else {
            user.likedProblemsIDs = user.likedProblemsIDs.filter(
              (p) => p.problemId.toString() !== problemId
            )
            await user.save()
            res.status(200).json({
              message: 'Problem unliked successfully',
            })
          }
        }
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({
        message: 'Server error',
      })
    }
  }
}

export const getLikedProblems = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(400).json({ message: 'Token is required' })
  } else {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
      const userId = decoded.id
      const user = await User.findOne({ id: userId })
      if (!user) {
        res.status(404).json({ message: 'User not found' })
      } else {
        res.status(200).json({
          likedProblemsIDs: user.likedProblemsIDs,
        })
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }
}

export const completeProblem = async (req: Request, res: Response) => {
  const { problemId, title } = req.body
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(400).json({ message: 'Token is required' })
  } else {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
      const user = await User.findOne({ id: decoded.id })
      if (!user) {
        res.status(404).json({
          message: 'No such user',
        })
      } else {
        const problem = await Problem.findById(problemId)
        if (!problem) {
          res.status(404).json({
            message: 'Problem not found',
          })
        } else {
          const currentTime = Date.now()
          if (
            !user.completedProblemsIDs.some(
              (p) => p.problemId.toString() === problemId
            )
          ) {
            user.completedProblemsIDs.push({
              problemId,
              timestamp: currentTime,
              title,
            })
            await user.save()
            res.status(200).json({
              message: 'Problem marked as completed successfully',
            })
          } else {
            user.completedProblemsIDs = user.completedProblemsIDs.filter(
              (p) => p.problemId.toString() !== problemId
            )
            await user.save()
            res.status(200).json({
              message: 'Problem marked as not completed successfully',
            })
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getCompletedProblems = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(400).json({ message: 'Token is required' })
  } else {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
      const userId = decoded.id
      const user = await User.findOne({ id: userId })
      if (!user) {
        res.status(404).json({ message: 'User not found' })
      } else {
        res.status(200).json({
          completedProblemsIDs: user.completedProblemsIDs,
        })
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }
}

export const getGoals = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(400).json({ message: 'Token is required' })
  } else {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
      const userId = decoded.id
      const user = await User.findOne({ id: userId })
      if (!user) {
        res.status(404).json({ message: 'User not found' })
      } else {
        res.status(200).json({
          goals: user.goals,
        })
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }
}

export const setGoal = async (req: Request, res: Response) => {
  const { goal } = req.body
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(400).json({ message: 'Token is required' })
  } else {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
      const userId = decoded.id
      const user = await User.findOne({ id: userId })
      if (!user) {
        res.status(404).json({ message: 'User not found' })
      } else {
        const currentTime = Date.now()
        user.goals.push({
          goal,
          timestamp: currentTime,
        })
        if (user.goals.length > 100) {
          user.goals = user.goals.slice(-100)
        }
        await user.save()
        res.status(200).json({
          goals: user.goals,
        })
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }
}

export const getRecommendation = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(400).json({ message: 'Token is required' })
  } else {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    const userId = decoded.id
    const user = await User.findOne({ id: userId })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
    } else {
      const goal = user.goals[user.goals.length - 1]?.goal
      if (!goal) {
        res.status(400).json({ message: 'No goal found for user' })
        return
      }

      const goalKeywords = goal.toLowerCase().split(/\s+/)
      const allProblems = await Problem.find({})

      const recommendedProblem = allProblems.find((problem) => {
        if (
          user.completedProblemsIDs.some((p) => {
            return p.problemId.toString() == problem._id?.toString()
          })
        )
          return false

        const tags = problem.topicTags.map((tag) => tag.name.toLowerCase())
        return goalKeywords.some((keyword) =>
          tags.some((tag) => tag.includes(keyword))
        )
      })

      if (recommendedProblem) {
        res.status(200).json({ problem: recommendedProblem })
      } else {
        res.status(404).json({ message: 'No matching problem found' })
      }
    }
  }
}
