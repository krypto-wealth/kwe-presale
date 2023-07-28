import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { AUTH_TAG, JWT_KEY } from '.'

export const useAuth = (wallet: Ref<string>, onSuccess?: () => any) => {
  const { $trpc } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [AUTH_TAG, wallet],
    mutationFn: (params: { challenge: string; signature: string }) =>
      $trpc.auth.auth.mutate(params),
    onSuccess(response) {
      const { jwt } = response
      const jwtTokens = JSON.parse(localStorage.getItem(JWT_KEY) ?? '{}')
      jwtTokens[wallet.value.toLowerCase()] = jwt
      localStorage.setItem(JWT_KEY, JSON.stringify(jwtTokens))
      queryClient.invalidateQueries([AUTH_TAG, 'validate', wallet])

      onSuccess?.()
    },
  })
}
