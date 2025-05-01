import express from 'express'
import { evaluateCode } from '../controllers/ai.controller'
const router = express.Router()

router.post('/evaluate', evaluateCode)

export default router
