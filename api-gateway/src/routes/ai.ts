import express from 'express'
import { Request, Response } from 'express'
import axios from 'axios'

const router = express.Router()
const AI_SERVICE_URL = process.env.AI_SERVICE_URL
const transferToAIService = async (
  req: Request,
  res: Response,
  url: string,
  method: 'get' | 'post' = 'post'
) => {
  try {
    const response =
      method === 'post'
        ? await axios.post(`${AI_SERVICE_URL}/${url}`, req.body)
        : await axios.get(`${AI_SERVICE_URL}/${url}`, { params: req.query })
    res.status(response.status).json(response.data)
  } catch (err: any) {
    console.log(err)
    res.status(err.response?.status || 500).json({ error: err.message })
  }
}
const evaluate = (req: Request, res: Response) => {
  try {
    const subRes = await axios.post(`${USER_SERVICE_URL}/addOneSubmission`)
  } catch (err: any) {
    console.log(err)
    res.status(err.response?.status || 500).json({ error: err.message })
  }
}
router.post('/evaluate')
router.post('/answer', (req, res) => transferToAIService(req, res, 'answer'))
router.post('/analyze', (req, res) => transferToAIService(req, res, 'analyze'))
router.get('/request', (req, res) =>
  transferToAIService(req, res, 'request', 'get')
)
const AIRouter = router
export default AIRouter
