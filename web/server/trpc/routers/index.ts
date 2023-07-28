import { router } from '@/server/trpc'

import { auth } from './auth'

export const appRouter = router({
  auth,
})

export type AppRouter = typeof appRouter
