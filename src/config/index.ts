import { UserController } from '@User/user.controller'
import { UserService } from '@User/user.service'

const userService = new UserService()
const userController = new UserController(userService)

export { userController }
