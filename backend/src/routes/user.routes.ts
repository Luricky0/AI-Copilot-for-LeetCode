import express from 'express'
import { completeProblem, getCompletedProblems, getGoals, getLikedProblems, likeProblem, login, register, setGoal } from '../controllers/user.controller'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/like', likeProblem)
router.get('/liked', getLikedProblems)
router.post('/complete',completeProblem)
router.get('/completed',getCompletedProblems)
router.get('/goals',getGoals)
router.post('/setgoal',setGoal)

export default router
