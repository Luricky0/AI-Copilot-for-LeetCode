import { Request, Response } from 'express';
import Question from '../models/question.model';

export const getPaginatedQuestions = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [questions, totalQuestions] = await Promise.all([
      Question.find().skip(skip).limit(limit),
      Question.countDocuments()
    ]);

    res.status(200).json({
      page,
      totalPages: Math.ceil(totalQuestions / limit),
      totalQuestions,
      questions
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed', error });
  }
};