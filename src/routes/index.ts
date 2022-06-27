import { Router } from 'express'

import { userNetwork } from '@User/user.network'
import { personajeNetwork } from '@Personaje/personaje.network'
import { peliculaNetwork } from '@Pelicula/pelicula.network'
import { generoNetwork } from '@Genero/genero.network'

export const router = Router()

router.use(userNetwork)

router.use('/api/v1', personajeNetwork)

router.use('/api/v1', peliculaNetwork)

router.use('/api/v1', generoNetwork)

router.get('/', (req, res) => {
  res.status(200).send('HOME API')
})

router.get('*', (req, res) => {
  res.status(404).send('NOT FOUND')
})
