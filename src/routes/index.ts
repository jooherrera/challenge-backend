import { Router } from 'express'

import { userNetwork } from '@User/user.network'
import { personajeNetwork } from '@Personaje/personaje.network'
import { peliculaNetwork } from '@Pelicula/pelicula.network'
import { generoNetwork } from '@Genero/genero.network'

export const router = Router()

router.get('/', (req, res) => {
  res.status(200).send('HOME API')
})
router.use(userNetwork)

router.use(personajeNetwork)

router.use(peliculaNetwork)

router.use(generoNetwork)

router.get('*', (req, res) => {
  res.status(404).send('NOT FOUND')
})
