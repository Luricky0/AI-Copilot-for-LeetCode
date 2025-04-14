import express from 'express'
import { getPaginatedProblems } from '../controllers/problem.controller'

const router = express.Router()

router.get('/problems', getPaginatedProblems)

export default router
