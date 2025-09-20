import express from 'express'
import { Request, Response } from 'express'
import axios from 'axios'

const router = express.Router()
const USER_SERVICE_URL = process.env.USER_SERVICE_URL

const transferToUserService = async (
  req: Request,
  res: Response,
  url: string,
  method: 'get' | 'post' = 'post'
) => {
  try {
    const response =
      method === 'post'
        ? await axios.post(`${USER_SERVICE_URL}/${url}`, req.body)
        : await axios.get(`${USER_SERVICE_URL}/${url}`, { params: req.query })
    res.status(response.status).json(response.data)
  } catch (err: any) {
    console.log(err)
    res.status(err.response?.status || 500).json({ error: err.message })
  }
}

router.get('/checktoken', (req, res) =>
  transferToUserService(req, res, 'checkToken', 'get')
)
router.post('/login', (req, res) => transferToUserService(req, res, 'login'))
router.post('/register', (req, res) =>
  transferToUserService(req, res, 'register')
)
router.post('/like', (req, res) => transferToUserService(req, res, 'like'))
router.get('/liked', (req, res) =>
  transferToUserService(req, res, 'liked', 'get')
)
router.post('/complete', (req, res) =>
  transferToUserService(req, res, 'complete')
)
router.get('/completed', (req, res) =>
  transferToUserService(req, res, 'completed', 'get')
)
router.get('/goals', (req, res) =>
  transferToUserService(req, res, 'goals', 'get')
)
router.post('/setgoal', (req, res) =>
  transferToUserService(req, res, 'setgoal')
)
router.get('/recommendation', (req, res) =>
  transferToUserService(req, res, 'recommendation', 'get')
)
router.post('/addSubmission', (req, res) =>
  transferToUserService(req, res, 'addSubmission')
)
router.get('/embedding', (req, res) =>
  transferToUserService(req, res, 'embedding', 'get')
)
router.get('/problems', (req, res) =>
  transferToUserService(req, res, 'problems', 'get')
)
router.get('/problem', (req, res) =>
  transferToUserService(req, res, 'problem', 'get')
)
router.post('/next', (req, res) => transferToUserService(req, res, 'next'))
const userRouter = router
export default userRouter
