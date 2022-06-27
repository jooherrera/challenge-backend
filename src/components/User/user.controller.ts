import { IUserService, Middleware } from '@Types'
import { boomify } from '@hapi/boom'

export class UserController {
  private service: IUserService
  constructor(service: IUserService) {
    this.service = service
  }

  register: Middleware = async (req, res, next) => {
    try {
      const { user, password } = req.body
      const resp = await this.service.createUser(user, password)

      if (!resp) {
        return next(boomify(new Error('Usuario o contraseña incorrecto'), { statusCode: 401 }))
      }

      res.sendStatus(201)
    } catch (error) {
      next(error)
    }
  }

  login: Middleware = async (req, res, next) => {
    try {
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }
}