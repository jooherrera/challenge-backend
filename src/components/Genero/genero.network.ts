import { generoController } from '@Config'
import { Mid } from '@Middlewares'
import { Router } from 'express'

export const generoNetwork = Router()

generoNetwork.use(Mid.obtainTokenFromHeader)

generoNetwork.post('/genres', generoController.create)

generoNetwork.get('/genres/:id?', generoController.find)

generoNetwork.patch('/genres/:id', generoController.update)

generoNetwork.delete('/genres/:id', generoController.delete)

generoNetwork.post('/genres/:id', generoController.addMovie)

generoNetwork.delete('/genres/:id/:idMovie', generoController.removeMovie)
