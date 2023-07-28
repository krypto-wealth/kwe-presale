import { createQueryKeys } from '@lukemorales/query-key-factory'
import { type MaybeRef } from '@vueuse/core'
import { BigNumber, constants } from 'ethers'

import { useEvm } from '@/evm.config'
import { parseBNWithSymbol } from '@/utils/bn'

const {
  contracts: { useContracts },
} = useEvm()

type MaybeRefString = MaybeRef<string>

export const investTokenReadKeys = createQueryKeys('$invest-token-read', {
  symbol: (args: {}) => [args],
  decimals: (args: {}) => [args],
  balance: (args: { wallet: MaybeRef<string> }) => [args],
  allowance: (args: { wallet: MaybeRefString; spender: MaybeRefString | string }) => [
    args,
  ],
})

export const useReadTokenSymbol = () => {
  const { DEFAULT_CHAINID } = useWallet()
  const { $investToken } = useContracts()
  return $useReadForever({
    ...investTokenReadKeys.symbol({}),
    queryFn: async () => {
      return await $call($investToken.symbol(), unref(DEFAULT_CHAINID))
    },
    placeholderData: '...',
  })
}

export const useReadTokenDecimals = () => {
  return $useReadForever({
    ...investTokenReadKeys.decimals({}),
    queryFn: async () => {
      const { DEFAULT_CHAINID } = useWallet()
      const { $investToken } = useContracts()
      return await $call($investToken.decimals(), unref(DEFAULT_CHAINID))
    },
    placeholderData: 6,
  })
}

export const useReadTokenBalanceBN = () => {
  const { DEFAULT_CHAINID, wallet } = useWallet()
  const { $investToken } = useContracts()
  return $useReadOnLogin({
    ...investTokenReadKeys.balance({ wallet }),
    queryFn: async ({ queryKey }) => {
      const { wallet } = getQueryParams(queryKey)
      return await $call($investToken.balanceOf(unref(wallet)), unref(DEFAULT_CHAINID))
    },
    placeholderData: constants.Zero,
  })
}

export const useReadTokenAllowance = () => {
  const { DEFAULT_CHAINID, wallet } = useWallet()
  const { $investToken, presale } = useContracts()
  return $useReadOnLogin({
    ...investTokenReadKeys.allowance({ wallet, spender: presale.address }),
    queryFn: async ({ queryKey }) => {
      const { wallet, spender } = getQueryParams(queryKey)
      return await $call($investToken.allowance(wallet, spender), unref(DEFAULT_CHAINID))
    },
    placeholderData: constants.Zero,
  })
}

export const useReadHasAllowance = (amountBN: MaybeRef<BigNumber>) => {
  const { data: allowance } = useReadTokenAllowance()
  return computed(() => {
    try {
      return allowance && allowance.value?.gte(unref(amountBN))
    } catch (e) {
      console.error(e)
      return false
    }
  })
}

export const useReadTokenBalance = () => {
  const { data: balanceBN } = useReadTokenBalanceBN()
  const { data: decimals } = useReadTokenDecimals()
  const { data: allowance } = useReadTokenAllowance()
  const { data: symbol } = useReadTokenSymbol()
  return {
    balance: computed(() =>
      parseBNWithSymbol(unref(balanceBN) ?? constants.Zero, decimals.value, symbol.value)
    ),
    allowance: computed(() =>
      parseBNWithSymbol(unref(allowance) ?? constants.Zero, decimals.value, symbol.value)
    ),
  }
}
