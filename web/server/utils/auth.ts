import { TRPCError } from '@trpc/server'
import { middleware, publicProcedure } from '@/server/trpc'

const isAuth = middleware(async ({ ctx, next }) => {
  const { wallet } = ctx
  if (wallet == null) throw new TRPCError({ code: 'UNAUTHORIZED' })

  return next({
    ctx: {
      wallet,
    },
  })
})

export const authProcedure = publicProcedure.use(isAuth)
