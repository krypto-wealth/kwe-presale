import { httpBatchLink, createTRPCProxyClient } from '@trpc/client'

import type { AppRouter } from '@/server/trpc/routers'
import { JWT_KEY } from '@/api/auth'
import { useEvm } from '@/evm.config'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      trpc: createTRPCProxyClient<AppRouter>({
        links: [
          httpBatchLink({
            url: '/api/trpc',
            headers() {
              const {
                wallet: { useWallet },
              } = useEvm()
              const wallet = useWallet().state.wallet
              const jwtTokens = JSON.parse(
                localStorage.getItem(JWT_KEY) ?? '{}'
              ) as Record<string, string>
              if (!jwtTokens[wallet.toLowerCase()]) return {}
              return {
                authorization: `Barier ${jwtTokens[wallet.toLowerCase()]}`,
              }
            },
          }),
        ],
      }),
    },
  }
})
