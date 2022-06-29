import { peliculaController } from '@Config'
import { Mid } from '@Middlewares'
import { findMovie, idCharacter, idMovieANDidCharacter, idParam, idParamOp, newMovie, patchMovie } from '@Utils/schemas'
import { Router } from 'express'

export const peliculaNetwork = Router()

peliculaNetwork.post('/movies', Mid.obtainTokenFromHeader, Mid.validatorHandler(newMovie, 'body'), peliculaController.create)

peliculaNetwork.get(
  '/movies/:id?',
  Mid.obtainTokenFromHeader,
  Mid.validatorHandler(findMovie, 'query'),
  Mid.validatorHandler(idParamOp, 'params'),
  peliculaController.find
)

peliculaNetwork.patch(
  '/movies/:id',
  Mid.obtainTokenFromHeader,
  Mid.validatorHandler(patchMovie, 'body'),
  Mid.validatorHandler(idParam, 'params'),
  peliculaController.update
)

peliculaNetwork.delete('/movies/:id', Mid.obtainTokenFromHeader, Mid.validatorHandler(idParam, 'params'), peliculaController.delete)

peliculaNetwork.post(
  '/movies/:id/characters',
  Mid.obtainTokenFromHeader,
  Mid.validatorHandler(idCharacter, 'body'),
  Mid.validatorHandler(idParam, 'params'),
  peliculaController.addCharacter
)

peliculaNetwork.delete(
  '/movies/:id/characters/:idCharacter',
  Mid.obtainTokenFromHeader,
  Mid.validatorHandler(idMovieANDidCharacter, 'params'),
  peliculaController.removeCharacter
)
