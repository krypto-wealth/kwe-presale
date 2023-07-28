import { createMutationKeys } from '@lukemorales/query-key-factory'
import { useMutation } from '@tanstack/vue-query'
import { useEvm } from '@/evm.config'
import { ethers } from 'ethers'
import { useDialogs } from '~/store/dialogs'
import { investTokenReadKeys } from './read'
import { MaybeRef } from '@vueuse/core'

const {
  contracts: { useContracts },
} = useEvm()

export const investTokenWriteKeys = createMutationKeys('$invest-token-write', {
  approve: (args: { wallet: MaybeRef<string> }) => [args],
})

export const useWriteApprove = () => {
  const { signer, wallet, DEFAULT_CHAINID, chainId, realChainId, switchChain } =
    useWallet()
  const dialogs = useDialogs()
  const { presale } = useContracts()
  let txHash = ''
  let switched = true

  return useMutation({
    ...investTokenWriteKeys.approve({ wallet }),
    mutationFn: async () => {
      if (unref(realChainId) !== unref(DEFAULT_CHAINID)) {
        switched = await switchChain(unref(DEFAULT_CHAINID))
        console.log(switched)
      }
      if (!switched) {
        throw new Error('chain didnt change')
      }

      const { investToken } = useContracts(signer.value()!, unref(DEFAULT_CHAINID))

      return investToken
        .approve(presale.address, ethers.constants.MaxUint256)
        .then((tx) => {
          dialogs.openDialog('wait', {}, { noCross: true, notClosable: true })
          txHash = tx.hash
          return tx.wait()
        })
    },

    onSuccess: () => {
      const { presale } = useContracts()
      invalidateMWQuery(
        investTokenReadKeys.allowance({ wallet, spender: presale.address }).queryKey
      )
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
