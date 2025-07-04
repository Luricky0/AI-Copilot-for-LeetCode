import { Types } from 'mongoose'
import Submission from '../models/submission.model'

const addOneSubmission = async (
  userId: Types.ObjectId,
  problemId: Types.ObjectId,
  code: string,
  model: string
) => {
  const newSubmission = new Submission({
    userId,
    problemId,
    code,
    timestamp: Date.now(),
  })
  return await newSubmission.save()
}

export const SubmissionSevice = {
  addOneSubmission,
}
