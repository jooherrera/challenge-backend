import Joi from 'joi'

export const registerSchema = Joi.object({
  user: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
})

export const newCharacter = Joi.object({
  imagen: Joi.string().required(),
  nombre: Joi.string().required(),
  edad: Joi.number().integer().required(),
  peso: Joi.number().required(),
  historia: Joi.string().required(),
})

export const findCharacter = Joi.object({
  name: Joi.string(),
  age: Joi.number().integer(),
  idMovie: Joi.number().integer(),
})

export const patchCharacter = Joi.object({
  imagen: Joi.string(),
  nombre: Joi.string(),
  edad: Joi.number().integer(),
  peso: Joi.number(),
  historia: Joi.string(),
})

export const idParam = Joi.object({
  id: Joi.number().integer().required(),
})

export const newMovie = Joi.object({
  imagen: Joi.string().required(),
  titulo: Joi.string().required(),
  fecha_creacion: Joi.string().required(),
  calificacion: Joi.number().integer().min(1).max(5).required(),
})

export const findMovie = Joi.object({
  name: Joi.string(),
  genre: Joi.string(),
  order: Joi.string().valid('ASC', 'DES'),
})

export const patchMovie = Joi.object({
  imagen: Joi.string(),
  titulo: Joi.string(),
  fecha_creacion: Joi.string(),
  calificacion: Joi.number().min(1).max(5),
})

export const idParamOp = Joi.object({
  id: Joi.number().integer(),
})

export const idCharacter = Joi.object({
  idCharacter: Joi.number().integer().required(),
})

export const idMovieANDidCharacter = Joi.object({
  id: Joi.number().integer().required(),
  idCharacter: Joi.number().integer().required(),
})

export const newGenre = Joi.object({
  imagen: Joi.string().required(),
  nombre: Joi.string().required(),
})

export const updateGenre = Joi.object({
  imagen: Joi.string(),
  nombre: Joi.string(),
})

export const idMovie = Joi.object({
  idMovie: Joi.number().integer().required(),
})

export const idGenreANDidMovie = Joi.object({
  id: Joi.number().integer().required(),
  idMovie: Joi.number().integer().required(),
})
