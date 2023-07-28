import {
  type EvmContext,
  type ChainId,
  useModule,
  getChainDescription,
  getChainHex,
  getChainName,
  getChainScanner,
  Chain,
  wallet,
  Wallet,
} from '@gotbit/evm'
import { events, methods } from '@gotbit/evm/lib/modules/wallet'

export class Truswallet extends wallet.WalletHandler {
  constructor(
    public ctx: EvmContext,
    public preferredChainId: ChainId,
    public updateStoreState: wallet.UpdateStoreStateFunction,
    public changeWalletCallback?: wallet.ChangeWalletCallbackFunction,
    public changeChainCallback?: wallet.ChangeChainCallbackFunction
  ) {
    super(
      ctx,
      preferredChainId,
      updateStoreState,
      changeWalletCallback,
      changeChainCallback
    )

    const ehtProvider = (window as any).trustwallet

    if (!ehtProvider) {
      const installPrompt = confirm(
        'Trust Wallet extension is not installed. Do you want to install it?'
      )

      if (installPrompt) {
        window.open('https://trustwallet.com/browser-extension/')
      }
    }

    if (ehtProvider && ehtProvider.providers) {
      this.nativeProvider = ehtProvider.providers.find(
        (provider: any) => provider.isTrustWallet
      )
    } else {
      this.nativeProvider = ehtProvider
    }

    if (!this.nativeProvider) {
      throw new Error('Please set up TrustWallet properly')
    }

    this.nativeProvider.on(events.CHANGE_WALLET, this.changeWalletHanlder?.bind(this))
    this.nativeProvider.on(events.CHANGE_CHAIN, this.changeChainHandler?.bind(this))
  }

  async connect(): Promise<boolean> {
    try {
      this.address = (
        await this.nativeProvider.request({
          method: methods.REQUEST_ACCOUNT,
        })
      )[0] as string

      await this.updateProviderState()

      if (!this.chainId) return false
      const wallet = useModule(this.ctx, Wallet)
      const walletState = wallet.useWallet().state

      if (
        !(walletState.chainIds as string[]).includes(this.chainId) &&
        !wallet.getWalletConfig().options?.preventDefaultChangeChain
      ) {
        await this.switchChain(this.preferredChainId)
      }

      return true
    } catch (error) {
      if (parseInt((error as any).code) == 4001) {
        alert('Please connect to TrustWallet.')
      } else {
        console.error(error)
      }
      return false
    }
  }

  async switchChain(chainId: ChainId): Promise<boolean> {
    try {
      await this.nativeProvider.request?.({
        method: methods.SWITCH_CHAIN,
        params: [{ chainId: getChainHex(chainId) }],
      })
      await this.updateProviderState()
      return true
    } catch (error) {
      if (parseInt((error as any).code) == 4902) return await this.addChain(chainId)
      console.error(error)
    }
    return false
  }

  async addChain(chainId: ChainId): Promise<boolean> {
    try {
      const chain = useModule(this.ctx, Chain)
      const param = {
        chainId: getChainHex(chainId),
        chainName: getChainName(chainId),
        nativeCurrency: {
          name: getChainDescription(chainId).symbol,
          symbol: getChainDescription(chainId).symbol,
          decimals: 18,
        },
        rpcUrls: [chain.getRpc(chainId)],
        blockExplorerUrls: getChainScanner(chainId) ? [getChainScanner(chainId)] : null,
      }
      await this.nativeProvider.request?.({
        method: methods.ADD_CHAIN,
        params: [param],
      })
      return true
    } catch (addError) {
      console.error(addError)
      return false
    }
  }

  async disconnect(): Promise<boolean> {
    this.clear()
    return true
  }
}
