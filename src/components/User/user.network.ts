import { Router } from 'express'
import { userController } from '@Config'
import { Mid } from '@Middlewares'
import { registerSchema } from '@Utils/schemas'

export const userNetwork = Router()

userNetwork.post('/auth/register', Mid.validatorHandler(registerSchema, 'body'), userController.register)

userNetwork.post('/auth/login', userController.login)
