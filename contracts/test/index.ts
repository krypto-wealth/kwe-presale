import { deployments, ethers } from 'hardhat'

import type { Presale, Token } from '@/typechain'

export const useContracts = async () => {
  return {
    token: await ethers.getContract<Token>('InvestToken'),
    presale: await ethers.getContract<Presale>('Presale'),
  }
}
