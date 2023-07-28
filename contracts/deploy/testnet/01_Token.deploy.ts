import { ethers } from 'hardhat'
import type { DeployFunction } from 'hardhat-deploy/types'

import type { Token__factory } from '@/typechain'
import { wrapperHRE } from '@gotbit/evm-hardhat'

const func: DeployFunction = async (hre) => {
  const { deploy } = wrapperHRE(hre)
  const [deployer] = await ethers.getSigners()

  await deploy<Token__factory>('InvestToken', {
    contract: 'Token',
    from: deployer.address,
    args: ['Tether USDT', 'USDT', 6],
    log: true,
  })
}
export default func

func.tags = ['Token.deploy']
