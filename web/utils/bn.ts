import { BigNumber } from 'ethers'

export function parseBN(bn: BigNumber, decimals: number = 18) {
  return {
    bn,
    ui: bn.formatString(decimals, 2, undefined, true),
  }
}

export function parseUI(ui: string, decimals: number = 18) {
  return {
    bn: ui.toBigNumber(decimals),
    ui,
  }
}

export function isBigNumber(value: string) {
  console.log({ value })
  try {
    console.log(value.toBigNumber())
    return true
  } catch (e) {
    return false
  }
}

export function parseBNWithSymbol(bn: BigNumber, decimals = 18, symbol = '') {
  return {
    bn,
    ui: bn.formatString(decimals, 2),
    uiWithSymbol: `${bn.formatString(decimals, 2)} ${symbol}`,
  }
}

export function BNtoNumber(bn: BigNumber, decimals = 18) {
  return {
    bn,
    num: bn.toNumber() / 10 ** decimals,
  }
}

export type IBN = {
  ui: string
  bn: BigNumber
}
