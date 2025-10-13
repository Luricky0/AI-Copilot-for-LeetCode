import express from 'express'
import { Request, Response } from 'express'
import axios from 'axios'

const router = express.Router()
const AI_SERVICE_URL = process.env.AI_SERVICE_URL
const USER_SERVICE_URL = process.env.USER_SERVICE_URL

export const transferToAIService = async (
  req: Request,
  res: Response,
  url: string,
  method: 'get' | 'post' = 'post'
) => {
  try {
    const targetUrl = `${AI_SERVICE_URL}/${url.replace(/^\/+/, '')}`

    const axiosConfig = {
      headers: req.headers,
      params: req.query, 
    }

    const response =
      method === 'post'
        ? await axios.post(targetUrl, req.body, axiosConfig)
        : await axios.get(targetUrl, axiosConfig)

    res.status(response.status).json(response.data)
  } catch (err: any) {
    console.error('Gateway Error:', err.message)
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message,
    })
  }
}

// Depends on User Service and AI Service
const evaluate = async (req: Request, res: Response) => {
  try {
    const subRes = await axios.post(
      `${USER_SERVICE_URL}/addOneSubmission`,
      req.body
    )
    const embeddingRes = await axios.get(`${USER_SERVICE_URL}/embedding`)
    const embedding = embeddingRes.data
    const payload = embedding ? { ...req.body, embedding } : req.body
    const evalRes = await axios.post(`${AI_SERVICE_URL}/evaluate`, payload)
    res.status(200).json(evalRes.data)
  } catch (err: any) {
    console.log(err)
    res.status(err.response?.status || 500).json({ error: err.message })
  }
}
// Evaluation depends on 2 services
router.post('/evaluate', evaluate)
router.post('/answer', (req, res) => transferToAIService(req, res, 'answer'))
router.post('/analyze', (req, res) => transferToAIService(req, res, 'analyze'))
router.get('/request', (req, res) =>
  transferToAIService(req, res, 'request', 'get')
)
const AIRouter = router
export default AIRouter
