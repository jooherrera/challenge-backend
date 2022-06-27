import { Personaje } from '@Personaje/personaje.model'
import { Pelicula } from '@Pelicula/pelicula.model'
import { CretePer, IService, newGenre, NewMovie } from '@Types'
import { boomify } from '@hapi/boom'
import { Genero } from '@Genero/genero.model'
import { where } from 'sequelize/types'

export class Service implements IService {
  constructor() {}

  /* -------------------------------- PERSONAJE ------------------------------- */

  async createPersonaje(p: CretePer): Promise<void> {
    await Personaje.create(p)
  }

  deletePersonaje = async (id: number) => {
    const resp = await Personaje.destroy({ where: { id } })
    if (!resp) {
      throw boomify(new Error('No existe el personaje'), { statusCode: 400 })
    }
  }

  updatePersonaje = async (id: number, p: CretePer) => {
    const resp = await Personaje.update(p, { where: { id } })
    if (resp[0] === 0) {
      throw boomify(new Error('No existe el personaje'), { statusCode: 400 })
    }
  }

  findAll = async () => {
    return await Personaje.findAll({ attributes: ['imagen', 'nombre'] })
  }

  findByName = async (name: string) => {
    return await Personaje.findAll({ where: { nombre: name }, include: Pelicula })
  }

  findByAge = async (age: number) => {
    return await Personaje.findAll({ where: { edad: age }, include: Pelicula })
  }

  findByMovie = async (idMovie: number) => {
    const personajesFound: any = await Pelicula.findOne({ where: { id: idMovie }, include: Personaje })

    if (!personajesFound) {
      return []
    }

    const cleaner = personajesFound.personajes.map((p: any) => {
      const { personaje_pelicula, ...rest } = p.toJSON()

      return rest
    })
    return cleaner
  }

  findPersonajeByID = async (id: number) => {
    const resp = await Personaje.findOne({ where: { id }, include: Pelicula })
    if (!resp) throw boomify(new Error('No existe el personaje'), { statusCode: 400 })
    return resp
  }

  /* -------------------------------- PELICULAS ------------------------------- */
  addMovie = async (newMovie: NewMovie): Promise<void> => {
    const movie = {
      ...newMovie,
      fecha_creacion: new Date(newMovie.fecha_creacion),
    }

    await Pelicula.create(movie)
  }

  findMovieByName = async (title: string) => {
    const movies = await Pelicula.findAll({ include: Personaje })
    if (!movies) return []

    const filtered = movies.filter((movie) => movie.toJSON().titulo.toLowerCase().includes(title.toLowerCase()))
    return filtered
  }

  findMovieByGenre = async (genre: string) => {
    const movies = await Genero.findAll({ where: { nombre: genre }, include: Pelicula })
    if (!movies) return []

    return movies
  }

  findMovieByOrder = async (order: string) => {
    const movies: any = await Pelicula.findAll({ include: Personaje })
    if (!movies) return []

    let ordered
    if (order === 'DES') {
      ordered = movies.sort((a: any, b: any) => b.fecha_creacion - a.fecha_creacion)
    } else {
      ordered = movies.sort((a: any, b: any) => a.fecha_creacion - b.fecha_creacion)
    }

    return ordered
  }

  findAllMovies = async () => {
    const movies = await Pelicula.findAll({ attributes: ['imagen', 'titulo', 'fecha_creacion'] })
    return movies
  }

  findMovieByID = async (id: number) => {
    const movie = await Pelicula.findOne({ where: { id }, include: Personaje })
    if (!movie) throw boomify(new Error('No existe la pelicula'), { statusCode: 400 })
    return movie
  }

  deleteMovie = async (id: number) => {
    const resp = await Pelicula.destroy({ where: { id } })
    if (!resp) {
      throw boomify(new Error('La pelicula no existe'), { statusCode: 400 })
    }
  }

  updateMovie = async (id: number, movie: NewMovie) => {
    const resp = await Pelicula.update(movie, { where: { id } })
    if (resp[0] === 0) {
      throw boomify(new Error('No existe la pelicula'), { statusCode: 400 })
    }
  }

  addCharacterToMovie = async (idMovie: number, idCharacter: number) => {
    const character: any = await Personaje.findOne({ where: { id: idCharacter } })
    const movie: any = await Pelicula.findOne({ where: { id: idMovie } })

    if (!character || !movie) {
      throw boomify(new Error('El personaje o la pelicula, no existe'), { statusCode: 400 })
    }

    movie.addPersonaje(character)
  }

  removeCharacterFromMovie = async (id: number, idCharacter: number) => {
    const character: any = await Personaje.findOne({ where: { id: idCharacter } })
    const movie: any = await Pelicula.findOne({ where: { id } })
    if (!character || !movie) {
      throw boomify(new Error('El personaje o la pelicula, no existe'), { statusCode: 400 })
    }
    const resp = await movie.removePersonaje(character)

    if (!resp) {
      throw boomify(new Error('El personaje o la pelicula, no existe'), { statusCode: 400 })
    }
  }

  /* --------------------------------- GENERO --------------------------------- */
  addGenre = async (newGenre: newGenre) => {
    await Genero.create(newGenre)
  }

  deleteGenre = async (id: number) => {
    const resp = await Genero.destroy({ where: { id } })
    if (!resp) {
      throw boomify(new Error('No existe el género'), { statusCode: 400 })
    }
  }

  updateGenre = async (id: number, genre: newGenre) => {
    const resp = await Genero.update(genre, { where: { id } })
    if (resp[0] === 0) {
      throw boomify(new Error('No existe el género'), { statusCode: 400 })
    }
  }

  findAllGenres = async () => {
    return await Genero.findAll()
  }

  addMovieToGenre = async (idGenre: number, idMovie: number) => {
    const genre: any = await Genero.findOne({ where: { id: idGenre } })
    const movie: any = await Pelicula.findOne({ where: { id: idMovie } })

    if (!genre || !movie) {
      throw boomify(new Error('El género o la pelicula, no existe'), { statusCode: 400 })
    }

    genre.addPelicula(movie)
  }

  findGenreByID = async (id: number) => {
    const resp = await Genero.findOne({ where: { id } })
    if (!resp) {
      throw boomify(new Error('No existe el género'), { statusCode: 400 })
    }
    return resp
  }

  removeMovieFromGenre = async (id: number, idMovie: number) => {
    const genre: any = await Genero.findOne({ where: { id } })
    const movie: any = await Pelicula.findOne({ where: { id: idMovie } })
    if (!genre || !movie) {
      throw boomify(new Error('El género o la pelicula, no existe'), { statusCode: 400 })
    }
    const resp = await genre.removePelicula(movie)
    if (!resp) {
      throw boomify(new Error('El género o la pelicula, no existe'), { statusCode: 400 })
    }
  }
}
