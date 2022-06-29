import { boomify } from '@hapi/boom'
import { IService, Middleware } from '@Types'

export class PersonajeController {
  private service: IService
  constructor(service: IService) {
    this.service = service
  }

  create: Middleware = async (req, res, next) => {
    try {
      const { body } = req
      await this.service.createPersonaje(body)
      res.sendStatus(201)
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return next(boomify(new Error('Ya existe el personaje'), { statusCode: 409 }))
      }
      next(error)
    }
  }

  find: Middleware = async (req, res, next) => {
    try {
      const { name, age, idMovie } = req.query
      const { id } = req.params
      let personajes

      if (id) {
        personajes = await this.service.findByID(Number(id))

        if (!personajes) {
          return res.status(404).send('No se encontró el personaje')
        }
        return res.status(200).send(personajes)
      }
      if (name && typeof name === 'string') {
        personajes = await this.service.findByName(name)
      } else if (age) {
        personajes = await this.service.findByAge(Number(age))
      } else if (idMovie) {
        personajes = await this.service.findByMovie(Number(idMovie))
      } else {
        personajes = await this.service.findAll()
      }

      res.status(200).send(personajes ?? [])
    } catch (error) {
      next(error)
    }
  }

  update: Middleware = async (req, res, next) => {
    try {
      const { body } = req
      const { id } = req.params
      await this.service.updatePersonaje(Number(id), body)
      res.sendStatus(200)
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return next(boomify(new Error(`El nombre no se puede repetir`), { statusCode: 409 }))
      }
      next(error)
    }
  }

  delete: Middleware = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.service.deletePersonaje(Number(id))
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }
}
