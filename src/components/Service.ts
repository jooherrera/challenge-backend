import { Personaje } from '@Personaje/personaje.model'
import { Pelicula } from '@Pelicula/pelicula.model'
import { CretePer, IService, newGenre, NewMovie } from '@Types'
import { boomify } from '@hapi/boom'
import { Genero } from '@Genero/genero.model'

export class Service implements IService {
  constructor() {}

  /* -------------------------------- PERSONAJE ------------------------------- */

  async createPersonaje(p: CretePer): Promise<void> {
    await Personaje.create(p)
  }

  deletePersonaje = async (id: number) => {
    const resp = await Personaje.destroy({ where: { id } })
    if (!resp) {
      throw boomify(new Error('No existe el personaje'), { statusCode: 404 })
    }
  }

  updatePersonaje = async (id: number, p: CretePer) => {
    const resp = await Personaje.update(p, { where: { id } })
    if (resp[0] === 0) {
      throw boomify(new Error('No existe el personaje'), { statusCode: 404 })
    }
  }

  findByID = async (id: number) => {
    return await Personaje.findOne({ where: { id }, include: { model: Pelicula, through: { attributes: [] } } })
  }

  findAll = async () => {
    return await Personaje.findAll({ attributes: ['imagen', 'nombre'] })
  }

  findByName = async (name: string) => {
    // return await Personaje.findOne({ where: { nombre: name }, include: Pelicula })
    return await Personaje.findOne({ where: { nombre: name }, include: { model: Pelicula, through: { attributes: [] } } })
  }

  findByAge = async (age: number) => {
    return await Personaje.findAll({ where: { edad: age }, include: { model: Pelicula, through: { attributes: [] } } })
  }

  findByMovie = async (idMovie: number) => {
    const movie: any = await Pelicula.findOne({ where: { id: idMovie }, attributes: [], include: { model: Personaje, through: { attributes: [] } } })
    return movie ? movie.personajes : []
  }

  /* -------------------------------- PELICULAS ------------------------------- */
  addMovie = async (newMovie: NewMovie): Promise<void> => {
    await Pelicula.create(newMovie)
  }

  findMovieByName = async (title: string) => {
    const movies = await Pelicula.findAll({ include: { model: Personaje, through: { attributes: [] } } })
    if (!movies) return []

    const filtered = movies.filter((movie) => movie.toJSON().titulo.toLowerCase().includes(title.toLowerCase()))
    return filtered
  }

  findMovieByGenre = async (genre: string) => {
    const movies: any = await Genero.findOne({
      where: { nombre: genre },
      attributes: [],
      include: { model: Pelicula, through: { attributes: [] } },
    })
    if (!movies) return []

    const newArr = []

    for await (let mov of movies.peliculas) {
      const movie = await Pelicula.findOne({ where: { id: mov.id }, include: { model: Personaje, through: { attributes: [] } } })
      newArr.push(movie)
    }

    return newArr
  }

  findMovieByOrder = async (order: string) => {
    const movies: any = await Pelicula.findAll({ include: { model: Personaje, through: { attributes: [] } } })
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
    const movie = await Pelicula.findOne({ where: { id }, include: { model: Personaje, through: { attributes: [] } } })
    if (!movie) throw boomify(new Error('No existe la pelicula'), { statusCode: 404 })
    return movie
  }

  deleteMovie = async (id: number) => {
    const resp = await Pelicula.destroy({ where: { id } })
    if (!resp) {
      throw boomify(new Error('La pelicula no existe'), { statusCode: 404 })
    }
  }

  updateMovie = async (id: number, movie: NewMovie) => {
    const resp = await Pelicula.update(movie, { where: { id } })
    if (resp[0] === 0) {
      throw boomify(new Error('No existe la pelicula'), { statusCode: 404 })
    }
  }

  addCharacterToMovie = async (idMovie: number, idCharacter: number) => {
    const character: any = await Personaje.findOne({ where: { id: idCharacter } })
    const movie: any = await Pelicula.findOne({ where: { id: idMovie } })

    if (!character || !movie) {
      throw boomify(new Error('El personaje o la pelicula, no existe'), { statusCode: 404 })
    }

    movie.addPersonaje(character)
  }

  removeCharacterFromMovie = async (id: number, idCharacter: number) => {
    const character: any = await Personaje.findOne({ where: { id: idCharacter } })
    const movie: any = await Pelicula.findOne({ where: { id } })
    if (!character || !movie) {
      throw boomify(new Error('El personaje o la pelicula, no existe'), { statusCode: 404 })
    }
    const resp = await movie.removePersonaje(character)

    if (!resp) {
      throw boomify(new Error('No hay relación entre la pelicula y el personaje'), { statusCode: 404 })
    }
  }

  /* --------------------------------- GENERO --------------------------------- */
  addGenre = async (newGenre: newGenre) => {
    await Genero.create(newGenre)
  }

  deleteGenre = async (id: number) => {
    const resp = await Genero.destroy({ where: { id } })
    if (!resp) {
      throw boomify(new Error('No existe el género'), { statusCode: 404 })
    }
  }

  updateGenre = async (id: number, genre: newGenre) => {
    const resp = await Genero.update(genre, { where: { id } })
    if (resp[0] === 0) {
      throw boomify(new Error('No existe el género'), { statusCode: 404 })
    }
  }

  findAllGenres = async () => {
    return await Genero.findAll()
  }

  addMovieToGenre = async (idGenre: number, idMovie: number) => {
    const genre: any = await Genero.findOne({ where: { id: idGenre } })
    const movie: any = await Pelicula.findOne({ where: { id: idMovie } })

    if (!genre || !movie) {
      throw boomify(new Error('El género o la pelicula, no existe'), { statusCode: 404 })
    }

    genre.addPelicula(movie)
  }

  findGenreByID = async (id: number) => {
    const resp = await Genero.findOne({ where: { id }, include: { model: Pelicula, through: { attributes: [] } } })
    if (!resp) {
      throw boomify(new Error('No existe el género'), { statusCode: 404 })
    }
    return resp
  }

  removeMovieFromGenre = async (id: number, idMovie: number) => {
    const genre: any = await Genero.findOne({ where: { id } })
    const movie: any = await Pelicula.findOne({ where: { id: idMovie } })
    if (!genre || !movie) {
      throw boomify(new Error('El género o la pelicula, no existe'), { statusCode: 404 })
    }
    const resp = await genre.removePelicula(movie)
    if (!resp) {
      throw boomify(new Error('No hay relación entre el genero y la pelicula'), { statusCode: 404 })
    }
  }
}
