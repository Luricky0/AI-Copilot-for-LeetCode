import express from 'express'
import { evaluateCode, getAnswer } from '../controllers/ai.controller'
const router = express.Router()

router.post('/evaluate', evaluateCode)
router.post('/answer', getAnswer)

export default router
