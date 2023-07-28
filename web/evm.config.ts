import {
  defineEvm,
  universalRpc,
  contract,
  Chain,
  Multicall,
  Store,
  Wallet,
  Events,
  Contracts,
} from '@gotbit/evm'
import { vueAdapater } from '@gotbit/evm-vue3'
import { wallets } from '@gotbit/evm-wallets'
import { Walletconnect } from './utils/wallets/walletconnect'
import { Truswallet } from './utils/wallets/trustwallet'

import contractsJSON from '@/.contracts/contracts.json'
import type { Presale, Token } from '@/.contracts/typechain'

const DEBUG = import.meta.env.VITE_DEBUG === 'true'

export const useEvm = defineEvm({
  DEBUG,
  adapter: vueAdapater,
  modules: {
    ...Chain(universalRpc()),
    ...Contracts({
      contractsJSON,
      ...(DEBUG
        ? {
            chainIds: ['43113'],
            DEFAULT_CHAINID: '43113',
          }
        : {
            chainIds: ['1'],
            DEFAULT_CHAINID: '1',
          }),
      contracts: {
        shared: {
          investToken: contract('InvestToken', {} as Token),
          presale: contract('Presale', {} as Presale),
        },
        on: {},
      },
    }),
    ...Multicall(),
    ...Store({
      stores: {},
    }),
    ...Wallet({
      wallets: {
        ...wallets,
        walletconnect: Walletconnect,
        trustwallet: Truswallet,
      },
      options: {
        preserveConnection: true,
        loadAllOnWalletChange: true,
      },
    }),
    ...Events(),
  },
})
