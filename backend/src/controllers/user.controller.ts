import { Request, Response } from 'express'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Problem from '../models/problem.model'
import { ObjectId } from 'mongodb'
import user from '../models/user.model'
import { UserService } from '../services/user.service'
import { randomInt } from 'crypto'

export const login = async (req: Request, res: Response) => {
  const { id, password } = req.body

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
  const user = await UserService.getUserByToken(req)
  const { problemId, title } = req.body
  if (user) {
    try {
      const userList = await UserService.toggleProblemStatus(
        user,
        problemId,
        title,
        'like'
      )
      res.status(200).json({
        likeProblemsIDs: userList,
      })
    } catch (err) {
      console.log(err)
      res.status(500)
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
  const user = await UserService.getUserByToken(req)
  const { problemId, title } = req.body
  if (user) {
    try {
      const userList = await UserService.toggleProblemStatus(
        user,
        problemId,
        title,
        'complete'
      )
      res.status(200).json({
        likeProblemsIDs: userList,
      })
    } catch (err) {
      console.log(err)
      res.status(500)
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
  const user = await UserService.getUserByToken(req)
  try {
    if (user == null) {
      res.status(404)
      return
    }
    const recommendedProblems =
      await UserService.generateTagNGoalBasedRecommendation(user)
    const random = randomInt(recommendedProblems.length)
    const recommendedProblem = recommendedProblems[random]
    res.status(200).json({
      recommendedProblem,
    })
  } catch (error) {
    console.log(error)
    res.status(505)
  }
}
