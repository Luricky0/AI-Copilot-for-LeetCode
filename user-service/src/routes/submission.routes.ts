import express from 'express'
import {
  addOneSubmission,
  getEmbedding,
} from '../controllers/submission.controller'
const router = express.Router()

router.post('/addSubmission', addOneSubmission)
router.get('/embedding', getEmbedding)

export default router
