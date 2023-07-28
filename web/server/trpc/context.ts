import type { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'

import { verifyJWT } from '@/server/utils'

export type Context = inferAsyncReturnType<typeof createContext>

export async function createContext(event: H3Event) {
  const headers = getHeaders(event)
  async function getAddressFromHeader() {
    if (headers.authorization) return verifyJWT(headers.authorization.split(' ')[1])
    return null
  }
  const wallet = await getAddressFromHeader()

  return {
    wallet: wallet?.wallet,
  }
}
