import { boomify } from '@hapi/boom'
import { IService, Middleware } from '@Types'

export class GeneroController {
  private service: IService
  constructor(service: IService) {
    this.service = service
  }

  create: Middleware = async (req, res, next) => {
    try {
      const { body } = req
      await this.service.addGenre(body)
      res.sendStatus(201)
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return next(boomify(new Error('Ya existe el género'), { statusCode: 400 }))
      }
      next(error)
    }
  }

  find: Middleware = async (req, res, next) => {
    try {
      const { id } = req.params
      let genres: any

      if (id) {
        genres = await this.service.findGenreByID(Number(id))
      } else {
        genres = await this.service.findAllGenres()
      }

      res.status(200).send(genres)
    } catch (error) {
      next(error)
    }
  }

  update: Middleware = async (req, res, next) => {
    try {
      const { id } = req.params
      const { body } = req
      await this.service.updateGenre(Number(id), body)
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  }

  delete: Middleware = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.service.deleteGenre(Number(id))
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  }

  addMovie: Middleware = async (req, res, next) => {
    try {
      const { id } = req.params
      const { idMovie } = req.body
      await this.service.addMovieToGenre(Number(id), idMovie)
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  }

  removeMovie: Middleware = async (req, res, next) => {
    try {
      const { id, idMovie } = req.params

      await this.service.removeMovieFromGenre(Number(id), Number(idMovie))
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  }
}
