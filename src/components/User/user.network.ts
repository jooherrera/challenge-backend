import { Router } from 'express'
import { userController } from '@Config'

export const userNetwork = Router()

userNetwork.post('/auth/register', userController.register)

userNetwork.post('/auth/login', userController.login)
