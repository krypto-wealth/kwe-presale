import { z } from 'zod'
import { utils } from 'ethers'
import { TRPCError } from '@trpc/server'

import { publicProcedure, router } from '@/server/trpc'
import { env } from '@/server/env'
import { prisma } from '@/server/services/db'

export const getChallenge = (wallet: string) =>
  `${env.CHALLENGE_MESSAGE}:${wallet.toLowerCase()}:${Date.now()}`
export const parseChallenge = (challenge: string) => {
  const [message, wallet, timestamp] = challenge.split(':')
  return { message, wallet, timestamp: parseInt(timestamp) }
}

export const auth = router({
  challenge: publicProcedure
    .input(
      z.object({
        wallet: z.string(),
      })
    )
    .output(z.object({ challenge: z.string() }))
    .query(({ input }) => {
      const { wallet } = input
      return { challenge: getChallenge(wallet) }
    }),

  auth: publicProcedure
    .input(
      z.object({
        signature: z.string(),
        challenge: z.string(),
      })
    )
    .output(
      z.object({
        jwt: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { challenge, signature } = input

      const { timestamp, wallet, message } = parseChallenge(challenge)

      if (message !== env.CHALLENGE_MESSAGE)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Wrong message in challenge',
        })

      if (timestamp + parseInt(env.CHALLENGE_EXPIRES) * 1000 < Date.now())
        throw new TRPCError({
          code: 'TIMEOUT',
          message: 'Challenge is timeout',
        })

      const realWallet = utils.verifyMessage(message, signature)
      if (realWallet.toLowerCase() == wallet.toLowerCase())
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized user',
        })

      const user = await prisma.user.findUnique({
        where: {
          wallet,
        },
      })

      if (!user)
        await prisma.user.create({
          data: {
            wallet,
          },
        })

      return {
        jwt: createJWT(wallet),
      }
    }),

  verify: publicProcedure
    .input(z.object({ wallet: z.string() }))
    .query(({ ctx, input }) =>
      ctx.wallet ? input.wallet.toLowerCase() === ctx.wallet.toLowerCase() : false
    ),
})
