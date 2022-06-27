import { Request, Response, NextFunction } from 'express'

export interface MiddlewareError {
  (err: any, req: Request, res: Response, next: NextFunction): void
}

export interface Middleware {
  (req: Request, res: Response, next: NextFunction): void
}

export interface IUserService {
  createUser(user: string, password: string): Promise<boolean>
  findUser(user: string): Promise<void>
}

interface Credential {
  user: string
  encryptedPassword: string
}
