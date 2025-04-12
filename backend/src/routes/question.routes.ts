import express from 'express';
import { getPaginatedQuestions } from '../controllers/question.controller';

const router = express.Router();

router.get('/questions', getPaginatedQuestions);

export default router;