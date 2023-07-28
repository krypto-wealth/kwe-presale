import { z } from 'zod'

export const emailValidation = (v: string) => {
  if (z.string().email().safeParse(v).success) return true
  return 'Please enter a valid email'
}
