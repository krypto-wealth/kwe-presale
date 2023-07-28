import { useEvm } from '@/evm.config'

export const useWallet = () => {
  const {
    wallet: { useWallet },
  } = useEvm()
  const wallet = useWallet()

  return {
    connect: wallet.connect.bind(wallet),
    disconnect: wallet.disconnect.bind(wallet),
    signMessage: wallet.signMessage.bind(wallet),
    switchChain: wallet.switchChain.bind(wallet),

    wallet: computed(() => wallet.state.wallet),
    walletLabel: computed(() => wallet.state.wallet.shortAddress(5, 5)),
    login: computed(() => wallet.state.login),
    signer: computed(() => wallet.state.signer),
    walletType: computed(() => wallet.state.walletType),

    chainId: computed(() => wallet.state.chainId),
    realChainId: computed(() => wallet.state.realChainId),
    chainIds: computed(() => wallet.state.chainIds),
    DEFAULT_CHAINID: computed(() => wallet.state.DEFAULT_CHAINID),

    isCorrectNetworkd: computed(
      () =>
        wallet.state.realChainId &&
        wallet.state.chainIds.includes(wallet.state.realChainId)
    ),
  }
}
