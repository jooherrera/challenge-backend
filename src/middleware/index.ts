import { boomify } from '@hapi/boom'
import { Middleware, MiddlewareError } from '@Types'
import { logError, logMsg, verifyToken } from '@Utils'

const boomErrorHandler: MiddlewareError = (error, req, res, next) => {
  if (error.isBoom) {
    const { output } = error
    return res.status(output.statusCode).json(output.payload.message)
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

export const Mid = { boomErrorHandler, errorHandler, obtainTokenFromHeader }
