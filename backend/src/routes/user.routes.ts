import express from 'express'
import { completeProblem, getCompletedProblems, getLikedProblems, likeProblem, login, register } from '../controllers/user.controller'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/like', likeProblem)
router.get('/liked', getLikedProblems)
router.post('/complete',completeProblem)
router.get('/completed',getCompletedProblems)

export default router
