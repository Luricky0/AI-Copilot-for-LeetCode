import express from 'express'
import { getLikedProblems, likeProblem, login, register } from '../controllers/user.controller'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/like', likeProblem)
router.get('/liked', getLikedProblems)

export default router
