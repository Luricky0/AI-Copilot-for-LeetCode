import express from 'express'
import {
  checkToken,
  completeProblem,
  getCompletedProblems,
  getGoals,
  getLikedProblems,
  getRecommendation,
  likeProblem,
  login,
  register,
  setGoal,
} from '../controllers/user.controller'
import { validateCaptcha } from '../middleware/captcha'

const router = express.Router()

router.get('/checktoken', checkToken)
router.post('/login', validateCaptcha, login)
router.post('/register', validateCaptcha, register)
router.post('/like', likeProblem)
router.get('/liked', getLikedProblems)
router.post('/complete', completeProblem)
router.get('/completed', getCompletedProblems)
router.get('/goals', getGoals)
router.post('/setgoal', setGoal)
router.get('/recommendation', getRecommendation)
export default router
