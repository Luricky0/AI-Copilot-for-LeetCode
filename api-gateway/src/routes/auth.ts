import express from 'express'
import { Request, Response } from 'express'
import axios from 'axios'

const router = express.Router()
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL

router.post('/register', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/register`, req.body)
    res.status(response.status).json(response.data)
  } catch (err: any) {
    res.status(err.response?.status || 500).json({ error: err.message })
  }
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body)
    res.status(response.status).json(response.data)
  } catch (err: any) {
    console.log(err)
    res.status(err.response?.status || 500).json({ error: err.message })
  }
})
const authRouter = router
export default authRouter
