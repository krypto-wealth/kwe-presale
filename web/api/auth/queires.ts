import { useQuery } from '@tanstack/vue-query'
import { createMutationKeys, createQueryKeys } from '@lukemorales/query-key-factory'

const authQueryKeys = createQueryKeys('auth', {
  challenge: (wallet: Ref<string>) => [wallet],
  validate: (wallet: Ref<string>) => [wallet],
})

export const useGetChallenge = (wallet: Ref<string>) => {
  const { $trpc } = useNuxtApp()
  return useQuery({
    ...authQueryKeys.challenge(wallet),
    queryFn: () => $trpc.auth.challenge.query({ wallet: wallet.value }),
    refetchInterval: 1800 * 1000,
  })
}

export const useAuthValidate = (wallet: Ref<string>) => {
  const { $trpc } = useNuxtApp()
  const { data } = useQuery({
    ...authQueryKeys.validate(wallet),
    queryFn: async () => $trpc.auth.verify.query({ wallet: wallet.value }),
  })
  return {
    isAuth: computed(() => data.value),
  }
}
