import jwt from 'jsonwebtoken'
import User from '../models/User'
import { ApiError } from '../utils/ApiError'

const JWT_SECRET = process.env.JWT_SECRET!

export const login = async (id: string, password: string): Promise<string> => {
  const user = await User.findOne({ id })
  if (!user) throw new ApiError(404, 'User not found')

  const isMatch = await user.comparePassword(password)
  if (!isMatch) throw new ApiError(401, 'Invalid credentials')

  return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' })
}

export const register = async (
  id: string,
  password: string
): Promise<string> => {
  const existingUser = await User.findOne({ id })
  if (existingUser) throw new ApiError(409, 'User already exists')

  const newUser = new User({ id, password })
  await newUser.save()

  return jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '7d' })
}
