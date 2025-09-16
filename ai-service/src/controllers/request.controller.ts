import { Request, Response } from 'express'
import { redis } from '../utils/reddis'
export const getResultByRequestId = async (req: Request, res: Response) => {
  try {
    const requestId = req.query.requestId as string
    if (!requestId) {
      return res.status(400).json({ message: 'Bad request' })
    }

    const data = await redis.get(requestId)
    if (!data) {
      return res.status(404).json({ message: 'No such data pending' })
    }

    const parsed = JSON.parse(data)

    if (parsed.status === 'ok') {
      return res.status(200).json(parsed)
    } else if (parsed.status === 'pending') {
      return res.status(202).json({ message: 'Data not ready' })
    } else {
      return res.status(500).json({ message: 'Unexpected status' })
    }
  } catch (err) {
    console.error('Error fetching result:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}