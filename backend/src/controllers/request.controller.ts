import { Request, Response } from 'express'
import { redis } from '../utils/reddis'
export const getResultByRequestId = async (req: Request, res: Response) => {
  const requestId = req.query.requestId as string
  if (requestId) {
    const data = await redis.get(requestId)
    console.log('request', data)
    if (data && JSON.parse(data).status === 'ok') res.status(200).json(data)
    else res.status(500).send()
  } else {
    res.status(404).send()
  }
}
