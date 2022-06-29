import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface MiddlewareError {
  (err: any, req: Request, res: Response, next: NextFunction): void
}

export interface Middleware {
  (req: Request, res: Response, next: NextFunction): void
}

export interface IUserService {
  createUser(user: string, password: string, email: string): Promise<void>
  findUser(user: string, password: string): Promise<string | null>
}

export interface IService {
  createPersonaje(p: CretePer): Promise<void>
  deletePersonaje(id: number): Promise<void>
  findAll(): Promise<any>
  updatePersonaje(id: number, p: any): Promise<void>
  findByName(name: string): Promise<any>
  findByID(id: number): Promise<any>
  findByAge(age: number): Promise<any>
  findByMovie(id: number): Promise<any>

  /* -------------------------------- PELICULA -------------------------------- */
  addMovie(newMovie: NewMovie): Promise<void>
  findAllMovies(): Promise<any>
  findMovieByName(title: string): Promise<any>
  findMovieByGenre(genre: string): Promise<any>
  findMovieByOrder(order: string): Promise<any>
  findMovieByID(id: number): Promise<any>
  deleteMovie(id: number): Promise<void>
  updateMovie(id: number, movie: NewMovie): Promise<void>
  addCharacterToMovie(idMovie: number, idCharacter: number): Promise<void>
  removeCharacterFromMovie(id: number, idCharacter: number): Promise<void>

  /* --------------------------------- GENERO --------------------------------- */
  addGenre(newGenre: newGenre): Promise<void>
  deleteGenre(id: number): Promise<any>
  updateGenre(id: number, genre: newGenre): Promise<any>
  findAllGenres(): Promise<any>
  findGenreByID(id: number): Promise<any>
  addMovieToGenre(idGenre: number, idMovie: number): Promise<void>
  removeMovieFromGenre(id: number, idMovie: number): Promise<void>
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload
    }
  }
}

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    userID: string
  }
}

export interface CretePer {
  [key: string | number | symbol]: string | number
  imagen: string
  nombre: string
  edad: number
  peso: number
  historia: string
  peliculaID: number
}

export interface NewMovie {
  [key: string | number | symbol]: string | number
  imagen: string
  titulo: string
  fecha_creacion: string
  calificacion: number
  personajeID: number
}

export interface newGenre {
  [key: string | number | symbol]: string | number
  imagen: string
  nombre: string
}
