import { z } from 'zod'

export const env = z
  .object({
    JWT_SECRET_KEY: z.string(),
    JWT_EXPIRES: z.string(),
    CHALLENGE_EXPIRES: z.string(),
    CHALLENGE_MESSAGE: z.string(),
  })
  .parse(process.env)
