import { ethers } from 'hardhat'

import type { DeployFunction } from 'hardhat-deploy/types'
import type { Presale__factory } from '@/typechain'

import { wrapperHRE } from '@gotbit/evm-hardhat'
import { BigNumber, BigNumberish } from 'ethers/lib/ethers'

export type RoundInfo = {
  hardcap: BigNumberish
  price: BigNumberish
}

const start = parseInt((Date.now() / 1000).toString()) + 1000
const duration = 24 * 3600 * 7

const rounds = [
  { hardcap: 600_000_000_000, price: 290 },
  { hardcap: 100_000_000_000, price: 390 },
  { hardcap: 300_000_000_000, price: 500 },
] as RoundInfo[]

const func: DeployFunction = async (hre) => {
  const { deploy } = wrapperHRE(hre)
  const [deployer, receiver] = await ethers.getSigners()

  const token = await ethers.getContract('InvestToken')

  console.log(
    'BB',
    (await token.provider.getBalance(deployer.address)).toString()
  )

  console.log(await token.provider.getNetwork())

  await deploy<Presale__factory>('Presale', {
    from: deployer.address,
    args: [
      token.address,
      start,
      duration,
      rounds,
      receiver.address,
      deployer.address,
    ],
    log: true,
  })

  console.log(
    'BA',
    (await token.provider.getBalance(deployer.address)).toString()
  )
}
export default func

export { rounds, start, duration }

func.tags = ['Presale.deploy']
func.dependencies = ['Token.deploy']
