import { personajeController } from '@Config'
import { Mid } from '@Middlewares'
import { findCharacter, idParam, idParamOp, newCharacter, patchCharacter } from '@Utils/schemas'
import { Router } from 'express'

export const personajeNetwork = Router()

personajeNetwork.post('/characters', Mid.obtainTokenFromHeader, Mid.validatorHandler(newCharacter, 'body'), personajeController.create)

personajeNetwork.get(
  '/characters/:id?',
  Mid.obtainTokenFromHeader,
  Mid.validatorHandler(findCharacter, 'query'),
  Mid.validatorHandler(idParamOp, 'params'),
  personajeController.find
)

personajeNetwork.patch(
  '/characters/:id',
  Mid.obtainTokenFromHeader,
  Mid.validatorHandler(patchCharacter, 'body'),
  Mid.validatorHandler(idParam, 'params'),
  personajeController.update
)

personajeNetwork.delete('/characters/:id', Mid.obtainTokenFromHeader, Mid.validatorHandler(idParam, 'params'), personajeController.delete)
