import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { env } from '@/server/env'

export const SECRET_KEY = 'secret'

export const saltPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export const verifyPassword = async (inputPassword: string, userPassword: string) => {
  return await bcrypt.compare(inputPassword, userPassword)
}

export const createJWT = (address: string) => {
  console.log('JWT_EXPIRES_IN: ', env.JWT_EXPIRES)
  return jwt.sign({ wallet: address.toLowerCase() }, env.JWT_SECRET_KEY, {
    expiresIn: env.JWT_EXPIRES,
  })
}

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, env.JWT_SECRET_KEY) as { wallet: string }
  } catch (e) {
    return {
      wallet: null,
    }
  }
}
