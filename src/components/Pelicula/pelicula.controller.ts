import { boomify } from '@hapi/boom'
import { IService, Middleware } from '@Types'

export class PeliculaController {
  private service: IService

  constructor(service: IService) {
    this.service = service
  }

  create: Middleware = async (req, res, next) => {
    try {
      const { body } = req

      const fecha = body.fecha_creacion
      const reGoodDate = /^\d{2}\/\d{2}\/\d{4}$/

      if (!reGoodDate.test(fecha)) {
        throw boomify(new Error('Formato de fecha incorrecto'), { statusCode: 400 })
      }

      const newFormat = new Date(fecha)

      const timestamp = newFormat.getTime()

      if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
        throw boomify(new Error('Formato de fecha incorrecto'), { statusCode: 400 })
      }

      await this.service.addMovie({ ...body, fecha_creacion: newFormat })
      res.sendStatus(201)
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return next(boomify(new Error('Ya existe una pelicula con ese nombre'), { statusCode: 409 }))
      }
      next(error)
    }
  }

  find: Middleware = async (req, res, next) => {
    try {
      const { name, genre, order } = req.query
      const { id } = req.params

      let peliculas

      if (id) {
        peliculas = await this.service.findMovieByID(Number(id))
        return res.status(200).send(peliculas)
      }

      if (name && typeof name === 'string') {
        peliculas = await this.service.findMovieByName(name)
        return res.status(200).send(peliculas)
      }

      if (genre && typeof genre === 'string') {
        peliculas = await this.service.findMovieByGenre(genre)
        return res.status(200).send(peliculas)
      }

      if (order && typeof order === 'string') {
        peliculas = await this.service.findMovieByOrder(order)
        return res.status(200).send(peliculas)
      }

      peliculas = await this.service.findAllMovies()

      res.status(200).send(peliculas)
    } catch (error) {
      next(error)
    }
  }

  update: Middleware = async (req, res, next) => {
    try {
      const { body } = req
      const { id } = req.params
      await this.service.updateMovie(Number(id), body)
      res.sendStatus(200)
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return next(boomify(new Error('Ya existe una pelicula con ese nombre'), { statusCode: 409 }))
      }
      next(error)
    }
  }

  delete: Middleware = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.service.deleteMovie(Number(id))
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }

  addCharacter: Middleware = async (req, res, next) => {
    try {
      const { id } = req.params
      const { idCharacter } = req.body
      await this.service.addCharacterToMovie(Number(id), idCharacter)
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }

  removeCharacter: Middleware = async (req, res, next) => {
    try {
      const { id, idCharacter } = req.params
      await this.service.removeCharacterFromMovie(Number(id), Number(idCharacter))
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }
}
