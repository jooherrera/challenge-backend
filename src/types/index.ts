import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface MiddlewareError {
  (err: any, req: Request, res: Response, next: NextFunction): void
}

export interface Middleware {
  (req: Request, res: Response, next: NextFunction): void
}

export interface IUserService {
  createUser(user: string, password: string): Promise<boolean>
  findUser(user: string, password: string): Promise<string | null>
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload
    }
  }
}

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    userID: string
  }
}
