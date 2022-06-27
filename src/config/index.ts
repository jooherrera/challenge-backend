import './associations'

import { PersonajeController } from '@Personaje/personaje.controller'
import { PersonajeService } from '@Personaje/personaje.service'
import { UserController } from '@User/user.controller'
import { UserService } from '@User/user.service'

const userService = new UserService()
const userController = new UserController(userService)

const personajeService = new PersonajeService()
const personajeController = new PersonajeController(personajeService)

export { userController, personajeController }
