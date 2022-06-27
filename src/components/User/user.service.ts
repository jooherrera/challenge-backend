import { mailOptionsToUser, sendAdminMail } from '@Config/nodemailer'
import { IUserService } from '@Types'
import { checkPassword, encryptPassword, signToken } from '@Utils'
import { User } from './user.model'

export class UserService implements IUserService {
  constructor() {}

  async createUser(user: string, password: string, email: string) {
    const encryptedPassword = await encryptPassword(password)
    await User.create({ user, password: encryptedPassword })

    const optionsUser = mailOptionsToUser(email, user)

    sendAdminMail(optionsUser)
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
