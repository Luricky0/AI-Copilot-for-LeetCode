import { Request, Response } from 'express'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'

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
