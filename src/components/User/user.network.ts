import { Router } from 'express'
import { userController } from '@Config'

export const userNetwork = Router()

userNetwork.post('/auth/register', userController.register)

userNetwork.get('/auth/login', userController.login)
