import { boomify } from '@hapi/boom'
import { IUserService } from '@Types'
import { checkPassword, encryptPassword, signToken } from '@Utils'
import { User } from './user.model'

export class UserService implements IUserService {
  constructor() {}

  async createUser(user: string, password: string): Promise<boolean> {
    try {
      const encryptedPassword = await encryptPassword(password)
      await User.create({ user, password: encryptedPassword })
      return true
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return false
      }
      return false
    }
  }

  async findUser(user: string, password: string): Promise<string> {
    const userFound = await User.findOne({ where: { user } })

    if (!userFound) {
      return ''
    }

    const encryptedPassword = userFound?.getDataValue('password')

    await checkPassword(password, encryptedPassword)

    const userID = userFound.getDataValue('id')

    const token = await signToken({ userID })

    return token
  }
}
