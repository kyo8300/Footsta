import { Response } from 'express'
import { Redis } from 'ioredis'
import { createUserLoader } from './utils/dataloader'

export interface gqlContext {
  res: Response
  session: Express.Session
  redis: Redis
  userLoader: ReturnType<() => typeof createUserLoader>
}
