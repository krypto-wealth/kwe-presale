import * as z from "zod"

export const UserModel = z.object({
  id: z.number().int(),
  wallet: z.string(),
  email: z.string().nullish(),
  removed: z.boolean(),
  updatedAt: z.date(),
  createdAt: z.date(),
})
