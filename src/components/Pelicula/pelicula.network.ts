import { peliculaController } from '@Config'
import { Mid } from '@Middlewares'
import { Router } from 'express'

export const peliculaNetwork = Router()

peliculaNetwork.use(Mid.obtainTokenFromHeader)

peliculaNetwork.post('/movies', peliculaController.create)

peliculaNetwork.get('/movies/:id?', peliculaController.find)

peliculaNetwork.patch('/movies/:id', peliculaController.update)

peliculaNetwork.delete('/movies/:id', peliculaController.delete)

peliculaNetwork.post('/movies/:id', peliculaController.addCharacter)

peliculaNetwork.delete('/movies/:id/:idCharacter', peliculaController.removeCharacter)
