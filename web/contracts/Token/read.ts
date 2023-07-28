import { createQueryKeys } from '@lukemorales/query-key-factory'
import { MaybeRef } from '@vueuse/core'
import { constants } from 'ethers'
import { useEvm } from '~/evm.config'

const {
  contracts: { useContracts },
} = useEvm()

// TODO fix token unused

export const tokenReadKeys = createQueryKeys('$token-read', {
  symbol: (args: {}) => [args],
  decimals: (args: {}) => [args],
  balance: (args: { wallet: MaybeRef<string> }) => [args],
})

const SYMBOL = 'KWE'

// export const useReadKweTokenSymbol = () => {
//   const { DEFAULT_CHAINID } = useWallet()
//   const { $kweToken } = useContracts()
//   return $useReadForever({
//     ...tokenReadKeys.symbol({}),
//     queryFn: async () => {
//       return await $call($kweToken.symbol(), unref(DEFAULT_CHAINID))
//     },
//     placeholderData: '...',
//   })
// }
export const useReadKweTokenSymbol = () => {
  return { data: SYMBOL }
}

// export const useReadKweTokenDecimals = () => {
//   return $useReadForever({
//     ...tokenReadKeys.decimals({}),
//     queryFn: async () => {
//       const { DEFAULT_CHAINID } = useWallet()
//       const { $kweToken } = useContracts()
//       return await $call($kweToken.decimals(), unref(DEFAULT_CHAINID))
//     },
//     placeholderData: 6,
//   })
// }

// export const useReadKweTokenBalanceBN = () => {
//   const { DEFAULT_CHAINID, wallet } = useWallet()
//   const { $kweToken } = useContracts()
//   return $useReadOnLogin({
//     ...tokenReadKeys.balance({ wallet }),
//     queryFn: async ({ queryKey }) => {
//       const { wallet } = getQueryParams(queryKey)
//       return await $call($kweToken.balanceOf(unref(wallet)), unref(DEFAULT_CHAINID))
//     },
//     placeholderData: constants.Zero,
//   })
// }

export const useReadKweTokenBalance = () => {
  // const { data: balanceBN } = useReadKweTokenBalanceBN()
  // const { data: decimals } = useReadKweTokenDecimals()
  // const { data: symbol } = useReadKweTokenSymbol()
  return {
    balanceKwe: computed(
      () => parseBNWithSymbol(constants.Zero, 18, SYMBOL)
      // parseBNWithSymbol(unref(balanceBN) ?? constants.Zero, decimals.value, symbol.value)
    ),
  }
}
