import express from 'express'
import {
  getPaginatedProblems,
  getProblem,
} from '../controllers/problem.controller'

const router = express.Router()

router.get('/problems', getPaginatedProblems)
router.get('/problem', getProblem)

export default router
