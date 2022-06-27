import { personajeController } from '@Config'
import { Mid } from '@Middlewares'
import { Router } from 'express'

export const personajeNetwork = Router()

personajeNetwork.use(Mid.obtainTokenFromHeader)

personajeNetwork.post('/characters', personajeController.create)

personajeNetwork.get('/characters/:id?', personajeController.find)

personajeNetwork.patch('/characters/:id', personajeController.update)

personajeNetwork.delete('/characters/:id', personajeController.delete)
