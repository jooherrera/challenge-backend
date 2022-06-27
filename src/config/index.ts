import './associations'

import { UserController } from '@User/user.controller'
import { UserService } from '@User/user.service'
import { Service } from '@Service'
import { PersonajeController } from '@Personaje/personaje.controller'
import { PeliculaController } from '@Pelicula/pelicula.controller'
import { GeneroController } from '@Genero/genero.controller'

const userService = new UserService()
const userController = new UserController(userService)

const service = new Service()
const personajeController = new PersonajeController(service)

const peliculaController = new PeliculaController(service)

const generoController = new GeneroController(service)

export { userController, personajeController, peliculaController, generoController }
