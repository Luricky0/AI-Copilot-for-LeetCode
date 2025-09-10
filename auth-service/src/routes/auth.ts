import express from 'express'
import type { Request, Response } from 'express'
import { login, register } from '../controllers/authController'

const router = express.Router()

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body
    const token = await register(id, password)
    res.status(201).json({ token })
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ message: err.message })
  }
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body
    const token = await login(id, password)
    res.status(200).json({ token })
  } catch (err: any) {
    console.log(err)
    res.status(err.statusCode || 500).json({ message: err.message })
  }
})

export default router
