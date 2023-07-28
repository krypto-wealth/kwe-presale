import { createQueryKeys } from '@lukemorales/query-key-factory'
import { type MaybeRef } from '@vueuse/core'
import { useEvm } from '@/evm.config'
import { constants } from 'ethers'
import { BigNumber } from 'ethers/lib/ethers'

const {
  contracts: { useContracts },
} = useEvm()

type MaybeRefString = MaybeRef<string>

export interface Rounds {
  SEED_ROUND: 0
  PRIVATE_ROUND: 1
  PUBLIC_ROUND: 2
}

export const presaleReadKeys = createQueryKeys('$presale-read', {
  duration: (args: {}) => [args],
  investToken: (args: {}) => [args],
  startTimestamp: (args: {}) => [args],
  totalInvested: (args: {}) => [args],
  roundTotalInvested: (args: { round: number }) => [args],
  roundInfo: (args: { round: number }) => [args],
  getUserInvestmentInfo: (args: { wallet: MaybeRef<string> }) => [args],
})

export const useReadPresaleDuration = () => {
  const { DEFAULT_CHAINID } = useWallet()
  const { $presale } = useContracts()

  return $useRead({
    ...presaleReadKeys.duration({}),
    queryFn: async () => {
      return await $call($presale.duration(), unref(DEFAULT_CHAINID))
    },
    placeholderData: 0,
  })
}

export const useReadPresaleInvestToken = () => {
  const { DEFAULT_CHAINID } = useWallet()
  const { $presale } = useContracts()

  return $useReadForever({
    ...presaleReadKeys.investToken({}),
    queryFn: async () => {
      return await $call($presale.investToken(), unref(DEFAULT_CHAINID))
    },
    placeholderData: '...',
  })
}

export const useReadPresaleStartTimestamp = () => {
  const { DEFAULT_CHAINID } = useWallet()
  const { $presale } = useContracts()

  return $useRead({
    ...presaleReadKeys.startTimestamp({}),
    queryFn: async () => {
      return await $call($presale.startTimestamp(), unref(DEFAULT_CHAINID))
    },
    placeholderData: 0,
  })
}

export const useReadPresaleRoundTotalInvested = (round: number) => {
  const { DEFAULT_CHAINID } = useWallet()
  const { $presale } = useContracts()

  return $useRead({
    ...presaleReadKeys.roundTotalInvested({ round }),
    queryFn: async ({ queryKey }) => {
      const { round } = getQueryParams(queryKey)
      return await $call(
        $presale.roundTotalInvested(BigNumber.from(round)),
        unref(DEFAULT_CHAINID)
      )
    },
    placeholderData: constants.Zero,
  })
}

export const useReadPresaleTotalInvested = () => {
  const { DEFAULT_CHAINID } = useWallet()
  const { $presale } = useContracts()

  return $useRead({
    ...presaleReadKeys.totalInvested({}),
    queryFn: async () => {
      return (await $call($presale.totalInvested(), unref(DEFAULT_CHAINID))) as BigNumber
    },
    placeholderData: constants.Zero as BigNumber,
  })
}

export const useReadPresaleRoundInfo = (round: number) => {
  const { DEFAULT_CHAINID } = useWallet()
  const { $presale } = useContracts()

  return $useRead({
    ...presaleReadKeys.roundInfo({ round }),
    queryFn: async ({ queryKey }) => {
      const { round } = getQueryParams(queryKey)
      return (await $call(
        $presale.rounds(BigNumber.from(round)),
        unref(DEFAULT_CHAINID)
      )) as [BigNumber, number]
    },
    placeholderData: [constants.Zero, 0] as [BigNumber, number],
  })
}

export const useReadTokenUserInvestmentInfo = () => {
  const { DEFAULT_CHAINID, wallet } = useWallet()
  const { $presale } = useContracts()

  return $useReadOnLogin({
    ...presaleReadKeys.getUserInvestmentInfo({ wallet }),
    queryFn: async ({ queryKey }) => {
      const { wallet } = getQueryParams(queryKey)
      return (await $call(
        $presale.getUserInvestmentInfo(wallet),
        unref(DEFAULT_CHAINID)
      )) as [number, number, BigNumber][]
    },
    placeholderData: [] as [number, number, BigNumber][],
  })
}

export const useReadPresaleInfo = (round: number) => {
  const { data: duration } = useReadPresaleDuration()
  const { data: investToken } = useReadPresaleInvestToken()
  const { data: roundTotalInvested } = useReadPresaleRoundTotalInvested(round)
  const { data: roundInfo } = useReadPresaleRoundInfo(round)
  const { data: startDate } = useReadPresaleStartTimestamp()
  const { data: totalInvested } = useReadPresaleTotalInvested()

  return {
    duration: computed(() => unref(duration)),
    investToken: computed(() => unref(investToken)),
    roundInfo: computed<[BigNumber, number]>(
      () => unref(roundInfo) ?? [constants.Zero, 0]
    ),
    roundTotalInvested: computed<BigNumber>(
      () => unref(roundTotalInvested) ?? constants.Zero
    ),
    startDate: computed(() => unref(startDate)),
    totalInvested: computed(() => unref(totalInvested)),
  }
}
