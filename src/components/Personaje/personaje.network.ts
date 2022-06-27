import { personajeController } from '@Config'
import { Router } from 'express'

export const personajeNetwork = Router()

personajeNetwork.post('/characters', personajeController.create)
