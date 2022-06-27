import bcrypt from 'bcrypt'
import { promisify } from 'util'
import Boom from '@hapi/boom'

const red = '\x1b[31m%s\x1b[0m'
const blue = '\x1b[34m%s\x1b[0m'

export const logError = (msg: string) => {
  console.log(red, msg)
}

export const logMsg = (msg: string) => {
  console.log(blue, msg)
}

export const encryptPassword = async (password: string) => {
  const salt = Number(process.env.SALT) || 5
  const hashPromise = promisify(bcrypt.hash)
  return await hashPromise(password, salt)
}

export const checkPassword = async (password: string, encryptedPassword: string) => {
  const decodePromise = promisify(bcrypt.compare)
  const resp = await decodePromise(password, encryptedPassword)
  if (!resp) {
    const err = new Error('Usuario o contraseña incorrecto')
    throw Boom.boomify(err, { statusCode: 401 })
  }
}
