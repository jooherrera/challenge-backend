import { IPersonajeService, Middleware } from '@Types'

export class PersonajeController {
  private service: IPersonajeService
  constructor(service: IPersonajeService) {
    this.service = service
  }

  create: Middleware = async (req, res, next) => {
    try {
      const { body } = req
      await this.service.createPersonaje(body)
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }

  find: Middleware = async (req, res, next) => {}

  update: Middleware = async (req, res, next) => {}

  delete: Middleware = async (req, res, next) => {}
}
