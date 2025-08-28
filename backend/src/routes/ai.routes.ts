import express from 'express'
import { evaluateCode, getAnalyzation, getAnswer } from '../controllers/ai.controller'
import { getResultByRequestId } from '../controllers/request.controller'
const router = express.Router()

router.post('/evaluate', evaluateCode)
router.post('/answer', getAnswer)
router.post('/analyze',getAnalyzation)
router.get('/request',getResultByRequestId)

export default router
