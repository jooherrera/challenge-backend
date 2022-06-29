import { IUserService, Middleware } from '@Types'
import { boomify } from '@hapi/boom'

export class UserController {
  private service: IUserService

  constructor(service: IUserService) {
    this.service = service
  }

  register: Middleware = async (req, res, next) => {
    try {
      const { user, password, email } = req.body
      await this.service.createUser(user, password, email)

      res.sendStatus(201)
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return next(boomify(new Error('Usuario no disponible'), { statusCode: 409 }))
      }
      next(error)
    }
  }

  login: Middleware = async (req, res, next) => {
    try {
      const { user, password } = req.body

      const token = await this.service.findUser(user, password)

      if (!token) {
        const err = new Error('Usuario o contraseña incorrecto')
        throw boomify(err, { statusCode: 401 })
      }

      res.status(202).json({ token: `Bearer ${token}` })
    } catch (error) {
      next(error)
    }
  }
}
