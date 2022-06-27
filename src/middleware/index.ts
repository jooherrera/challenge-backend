import { MiddlewareError } from '@Types'
import { logError, logMsg } from '@Utils'

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

export const Mid = { boomErrorHandler, errorHandler }
