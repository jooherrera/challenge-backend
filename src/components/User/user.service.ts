import { IUserService } from '@Types'
import { encryptPassword } from '@Utils'
import { User } from './user.model'

export class UserService implements IUserService {
  constructor() {}

  async createUser(user: string, password: string): Promise<boolean> {
    try {
      const encryptedPassword = await encryptPassword(password)
      await User.create({ user, encryptedPassword })
      return true
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return false
      }
      return false
    }
  }

  async findUser(user: string) {}
}
