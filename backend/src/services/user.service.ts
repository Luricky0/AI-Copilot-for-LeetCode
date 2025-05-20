import { Request, Response } from 'express'

import User, { Iuser } from '../models/user.model'
import jwt from 'jsonwebtoken'

const getUserByToken = async (req: Request): Promise<Iuser | null> => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    console.log("No token found in headers")
    return null
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    const userid = decoded.id  
    const user = await User.findOne({ id:userid })
    return user
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}
