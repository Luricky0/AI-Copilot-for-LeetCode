import { Types } from 'mongoose'
import Submission from '../models/submission.model'
import gemini from '../models/gemini.model'

const addOneSubmission = async (
  userId: Types.ObjectId,
  problemId: Types.ObjectId,
  code: string,
  model: string
) => {
  const embedding = await gemini.getEmbedding(code)
  const newSubmission = new Submission({
    userId,
    problemId,
    code,
    timestamp: Date.now(),
    embedding,
  })
  return await newSubmission.save()
}

export const SubmissionSevice = {
  addOneSubmission,
}
