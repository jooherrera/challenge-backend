import { Router } from 'express'
import { userController } from '@Config'
import { Mid } from '@Middlewares'

export const userNetwork = Router()

userNetwork.post('/auth/register', userController.register)

userNetwork.post('/auth/login', userController.login)

userNetwork.get('/dashboard', Mid.obtainTokenFromHeader, userController.dashboard)
