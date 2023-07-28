import { ChainId } from '@gotbit/evm'
import { MulticallWorkerType } from '@gotbit/evm/lib/modules/multicall'

import { QueryClient, useQuery } from '@tanstack/vue-query'
import type { QueryKey, UseQueryOptions, UseQueryReturnType } from '@tanstack/vue-query'
import { MaybeRefDeep } from '@tanstack/vue-query/build/lib/types'
import { useEvm } from '@/evm.config'

const {
  multicall: { MulticallWorker },
} = useEvm()

const $queryClient = new QueryClient()
const mws: Record<ChainId, MulticallWorkerType | undefined> = {} as any

const REFRESH_RATE = 5 * 60 * 1000

setInterval(async () => {
  const data = $queryClient.getQueriesData({ type: 'active' })

  if (data.length > 0) {
    for (const chainId in mws)
      await mws[chainId as ChainId]?.fulfillCalls(chainId as ChainId)
  }
}, 1000)

export const invalidateMWQuery = (queryKey: MaybeRefDeep<QueryKey>) => {
  $queryClient.invalidateQueries(queryKey)
}

export const useRead = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryReturnType<TData, TError> => {
  return useQuery({
    ...options,
  })
}

export const useReadForever = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryReturnType<TData, TError> => {
  return useQuery({
    staleTime: Infinity,
    cacheTime: Infinity,
    ...options,
  })
}

export const useReadOnLogin = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryReturnType<TData, TError> => {
  const { login } = useWallet()
  return useQuery({
    enabled: computed(() => unref(login) && (unref(options.enabled) ?? true)),
    staleTime: REFRESH_RATE,
    cacheTime: REFRESH_RATE,
    ...options,
  })
}

export const $useRead = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryReturnType<TData, TError> => {
  return useQuery({
    ...options,
    queryClient: $queryClient,
  })
}

export const $useReadForever = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryReturnType<TData, TError> => {
  return useQuery({
    staleTime: Infinity,
    cacheTime: Infinity,
    ...options,
    queryClient: $queryClient,
  })
}

export const $useReadOnLogin = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryReturnType<TData, TError> => {
  const { login } = useWallet()
  return useQuery({
    enabled: computed(() => unref(login) && (unref(options.enabled) ?? true)),
    staleTime: REFRESH_RATE,
    cacheTime: REFRESH_RATE,
    ...options,
    queryClient: $queryClient,
  })
}

export async function $call<T>(value: Promise<T>, chainId: ChainId) {
  if (!(chainId in mws)) mws[chainId] = new MulticallWorker()

  const result = await new Promise<T | undefined>((res) =>
    mws[chainId]?.call(value).fulfill(res)
  )
  if (result === undefined) throw new Error('Multicall is failed')
  return result
}

export function getQueryParams<N extends any[], T>(keys: readonly [...N, T]) {
  return keys[keys.length - 1] as T
}
