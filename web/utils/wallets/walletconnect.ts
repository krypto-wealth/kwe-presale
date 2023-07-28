import { EthereumProvider } from '@walletconnect/ethereum-provider'
import { methods } from '@gotbit/evm/lib/modules/wallet'

import {
  type EvmContext,
  type ChainId,
  useModule,
  getChainDescription,
  getChainHex,
  getChainName,
  getChainScanner,
  Chain,
  chainIds as allChainIds,
  keyOf,
  safe,
  wallet,
  Wallet,
} from '@gotbit/evm'

export class Walletconnect extends wallet.WalletHandler {
  public appName!: string
  public nativeProvider: InstanceType<typeof EthereumProvider> | undefined = undefined

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

    this.initProvider()
  }

  async initProvider() {
    if (this.nativeProvider) return
    const wallet = useModule(this.ctx, Wallet)
    const walletState = wallet.useWallet().state

    const rpc = {} as { [key: number]: string }

    const chain = useModule(this.ctx, Chain)

    for (const chainTag of keyOf(allChainIds)) {
      const chainId =
        `${allChainIds[chainTag]}` as `${(typeof allChainIds)[typeof chainTag]}`
      rpc[parseInt(chainId)] = chain.getRpc(chainId)
    }

    this.nativeProvider = await EthereumProvider.init({
      projectId: '2c07542ba20348f74c069680d652c326',
      showQrModal: true,
      rpcMap: rpc,
      chains: [parseInt(this.preferredChainId)],
    })
  }

  async connect(): Promise<boolean> {
    await this.initProvider()
    if (!this.nativeProvider) return false
    try {
      await this.nativeProvider.enable().catch(console.error)

      // this.appName = this.nativeProvider?.wc._peerMeta.name
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

      this.nativeProvider.once('accountsChanged', this.changeWalletHanlder?.bind(this))
      this.nativeProvider.once('chainChanged', (chainId) => {
        this.changeChainHandler?.call(this, parseInt(chainId))
      })

      const disconnectHandler = async () => {
        if (!this.actual) return

        const wallet = useModule(this.ctx, Wallet)
        const walletState = wallet.useWallet().state

        this.updateStoreState({
          signer: null,
          wallet: '',
          chainId: this.preferredChainId,
          login: false,
        })
        this.nativeProvider?.once('disconnect', async () => await disconnectHandler())
      }

      this.nativeProvider.once('disconnect', async () => await disconnectHandler())
      return true
    } catch (error) {
      console.error(error)
      return false
    } finally {
    }
  }
  clear() {
    super.clear()
    this.nativeProvider?.removeListener('disconnect', async () => {
      const wallet = useModule(this.ctx, Wallet)
      const walletState = wallet.useWallet().state

      this.updateStoreState({
        signer: null,
        wallet: '',
        chainId: this.preferredChainId,
        login: false,
      })
    })
  }

  async switchChain(chainId: ChainId): Promise<boolean> {
    await this.initProvider()
    if (!this.nativeProvider) return false

    if ((await this.getChainId()) === (chainId as string)) {
      return false
    }
    if (this.appName.includes('Trust Wallet')) {
      return false
    }

    console.log('Sending request to change chain')

    const [res, err] = await safe(
      this.nativeProvider.request({
        method: methods.SWITCH_CHAIN,
        params: [{ chainId: getChainHex(chainId) }],
      })
    )
    if (err) {
      const errorMessage = (err as any).message.replace(/ "[^]*"/, '')
      switch (errorMessage) {
        case 'User rejected the request.':
          return false
        case 'Unrecognized chain ID. Try adding the chain using wallet_addEthereumChain first.':
          await this.addChain(chainId)
          return true
      }
    } else {
      await this.updateProviderState()
    }
    return true
  }
  async addChain(chainId: ChainId): Promise<boolean> {
    await this.initProvider()
    if (!this.nativeProvider) return false

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
      const resp = await this.nativeProvider.request({
        method: methods.ADD_CHAIN,
        params: [param],
      })
      console.log(resp)
      return true
    } catch (addError) {
      console.log(addError)
      return false
    }
  }

  async disconnect(): Promise<boolean> {
    await this.initProvider()
    this.clear()

    if (!this.nativeProvider) return false
    await this.nativeProvider.disconnect()

    return true
  }
}
