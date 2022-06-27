import { Router } from 'express'

import { userNetwork } from '@User/user.network'
import { personajeNetwork } from '@Personaje/personaje.network'

export const router = Router()

router.use(userNetwork)

router.use('/api/v1', personajeNetwork)

router.get('/', (req, res) => {
  res.status(200).send('HOME API')
})

router.get('*', (req, res) => {
  res.status(404).send('NOT FOUND')
})
