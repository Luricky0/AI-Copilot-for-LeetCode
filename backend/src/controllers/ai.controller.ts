import { Request, Response } from 'express'
import gemini from '../models/ai.model'
export const evaluateCode = async (req: Request, res: Response) => {
  const { title, code } = req.body
  try {
    const aiRes = await gemini.evaluateCodeWithGemini(title, code)
    res.status(200).json({
      message: aiRes,
    })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}
