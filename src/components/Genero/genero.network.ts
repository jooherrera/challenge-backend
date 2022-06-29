import { generoController } from '@Config'
import { Mid } from '@Middlewares'
import { idGenreANDidMovie, idMovie, idParam, idParamOp, newGenre, updateGenre } from '@Utils/schemas'
import { Router } from 'express'

export const generoNetwork = Router()

generoNetwork.post('/genres', Mid.obtainTokenFromHeader, Mid.validatorHandler(newGenre, 'body'), generoController.create)

generoNetwork.get('/genres/:id?', Mid.obtainTokenFromHeader, Mid.validatorHandler(idParamOp, 'params'), generoController.find)

generoNetwork.patch(
  '/genres/:id',
  Mid.obtainTokenFromHeader,
  Mid.validatorHandler(updateGenre, 'body'),
  Mid.validatorHandler(idParam, 'params'),
  generoController.update
)

generoNetwork.delete('/genres/:id', Mid.obtainTokenFromHeader, Mid.validatorHandler(idParam, 'params'), generoController.delete)

generoNetwork.post(
  '/genres/:id/movies',
  Mid.obtainTokenFromHeader,
  Mid.validatorHandler(idMovie, 'body'),
  Mid.validatorHandler(idParam, 'params'),
  generoController.addMovie
)

generoNetwork.delete(
  '/genres/:id/movies/:idMovie',
  Mid.obtainTokenFromHeader,
  Mid.validatorHandler(idGenreANDidMovie, 'params'),
  generoController.removeMovie
)
