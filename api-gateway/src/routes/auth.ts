import express from 'express'
import { Request, Response } from 'express'
import axios from 'axios'
import jwt from 'jsonwebtoken';

const router = express.Router()
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/checktoken', async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });
    const payload = jwt.verify(token, JWT_SECRET!) as object;
    res.status(200).json({ valid: true, payload });
  } catch (err: any) {
    res.status(401).json({ valid: false, error: err.message });
  }
});


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
