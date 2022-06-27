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
      await this.service.addMovie(body)
      res.sendStatus(200)
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return next(boomify(new Error('Ya existe el personaje'), { statusCode: 400 }))
      }
      next(error)
    }
  }

  find: Middleware = async (req, res, next) => {
    try {
      const { name, genre, order } = req.query

      let peliculas

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
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  }

  delete: Middleware = async (req, res, next) => {
    try {
      const { id } = req.params

      await this.service.deleteMovie(Number(id))
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  }

  addCharacter: Middleware = async (req, res, next) => {
    try {
      const { id } = req.params
      const { idCharacter } = req.body

      await this.service.addCharacterToMovie(Number(id), idCharacter)
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  }

  removeCharacter: Middleware = async (req, res, next) => {
    try {
      const { id, idCharacter } = req.params
      await this.service.removeCharacterFromMovie(Number(id), Number(idCharacter))
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  }
}
