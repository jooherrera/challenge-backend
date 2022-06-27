import bcrypt from 'bcrypt'
import { promisify } from 'util'
import { boomify } from '@hapi/boom'
import jwt, { JwtPayload } from 'jsonwebtoken'

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
    throw boomify(err, { statusCode: 401 })
  }
  return true
}

export const signToken = async (payload: JwtPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET!, { expiresIn: process.env.EXP_TIME }, (err, token) => {
      if (err) return reject(err)
      if (token) return resolve(token)

      return reject('No se generó el token')
    })
  })
}

export const verifyToken = async (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET!, (err, decoded) => {
      if (err) return reject(boomify(new Error(err.message), { statusCode: 401 }))
      if (typeof decoded === 'undefined') return reject(boomify(new Error('No se pudo decodificar el token'), { statusCode: 401 }))
      if (typeof decoded === 'string') return reject(boomify(new Error('No se pudo decodificar el token'), { statusCode: 401 }))
      return resolve(decoded)
    })
  })
}
