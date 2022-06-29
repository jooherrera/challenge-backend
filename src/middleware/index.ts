import { boomify } from '@hapi/boom'
import { Middleware, MiddlewareError } from '@Types'
import { logError, verifyToken } from '@Utils'
import { NextFunction, Request, Response } from 'express'

const boomErrorHandler: MiddlewareError = (error, req, res, next) => {
  if (error.isBoom) {
    const { output } = error
    return res.status(output.statusCode).json(output.payload.message)
  }

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Formato JSON inválido' })
  }

  logError(error)
  next(error)
}

const errorHandler: MiddlewareError = (error, req, res, next) => {
  res.status(500).json({
    message: 'Hubo un error. Pronto lo estaremos resolviendo',
  })
}

const obtainTokenFromHeader: Middleware = async (req, res, next) => {
  try {
    if (typeof req.headers['authorization'] === 'undefined') {
      return next(boomify(new Error('No se encontro el header con el token'), { statusCode: 401 }))
    }
    const header: string = req.headers['authorization']

    const token = header.split(' ')[1]

    const data = await verifyToken(token)

    req.user = data

    next()
  } catch (error) {
    next(error)
  }
}

const validatorHandler = (schema: any, property: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property as keyof typeof req]
    const { error } = schema.validate(data)
    if (error) {
      next(boomify(new Error('Parametros incorrectos.'), { statusCode: 400 }))
    }
    next()
  }
}

export const Mid = { boomErrorHandler, errorHandler, obtainTokenFromHeader, validatorHandler }
