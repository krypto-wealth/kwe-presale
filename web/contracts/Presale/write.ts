import { createMutationKeys } from '@lukemorales/query-key-factory'
import { useMutation } from '@tanstack/vue-query'
import { useEvm } from '@/evm.config'
import { useDialogs } from '~/store/dialogs'
import { investTokenReadKeys, useReadTokenDecimals } from '../investToken'
import { tokenReadKeys } from '../Token'
import { presaleReadKeys } from './read'
import { parseUI } from '~/utils/bn'

const {
  contracts: { useContracts },
} = useEvm()

export const presaleWriteKeys = createMutationKeys('$presale-write', {
  invest: (args: {}) => [args],
})

export const useWritePresaleInvest = (round: number) => {
  const { signer, chainId, wallet, realChainId, DEFAULT_CHAINID, switchChain } =
    useWallet()
  const { data: decimals } = useReadTokenDecimals()
  const { presale } = useContracts(signer.value()!)
  const dialogs = useDialogs()
  let txHash = ''
  let switched = true

  return useMutation({
    mutationKey: ['presale'],
    mutationFn: async ({ amount, round }: { amount: string; round: number }) => {
      if (unref(realChainId) !== unref(DEFAULT_CHAINID)) {
        switched = await switchChain(unref(DEFAULT_CHAINID))
        console.log(switched)
      }
      if (!switched) {
        throw new Error('chain didnt change')
      }
      const { presale } = useContracts(signer.value()!)
      const amountBN = parseUI(amount, unref(decimals))
      return presale.invest(amountBN.bn, round).then((tx) => {
        dialogs.openDialog('wait', {}, { noCross: true, notClosable: true })
        txHash = tx.hash
        return tx.wait()
      })
    },
    onSuccess: () => {
      dialogs.openDialog(
        'success',
        {
          title: 'Success',
          btnTitle: 'Home page',
          txHash: txHash,
          chainId: chainId.value,
        },
        { noCross: false }
      )
      invalidateMWQuery(investTokenReadKeys.balance({ wallet }).queryKey)
      invalidateMWQuery(tokenReadKeys.balance({ wallet }).queryKey)
      invalidateMWQuery(
        investTokenReadKeys.allowance({ wallet, spender: presale.address }).queryKey
      )
      invalidateMWQuery(presaleReadKeys.totalInvested({}).queryKey)
      invalidateMWQuery(presaleReadKeys.roundTotalInvested({ round }).queryKey)
      invalidateMWQuery(presaleReadKeys.getUserInvestmentInfo({ wallet }).queryKey)
    },

    onError: () =>
      dialogs.openDialog(
        'error',
        {
          title: 'Error',
          text: 'Warning! An error has occurred. Please try again.',
          btnTitle: 'Try again',
        },
        { noCross: false }
      ),
  })
}
