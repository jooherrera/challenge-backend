import { Router } from 'express'

import { userNetwork } from '@User/user.network'

export const router = Router()

router.use(userNetwork)

router.get('/', (req, res) => {
  res.status(200).send('HOME API')
})

router.get('*', (req, res) => {
  res.status(404).send('NOT FOUND')
})
