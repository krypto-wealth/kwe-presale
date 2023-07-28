import { ethers } from 'hardhat'

import type { DeployFunction } from 'hardhat-deploy/types'
import type { Presale__factory } from '@/typechain'

import { wrapperHRE } from '@gotbit/evm-hardhat'
import { BigNumber, BigNumberish } from 'ethers/lib/ethers'

export type RoundInfo = {
  hardcap: BigNumberish
  price: BigNumberish
}

const func: DeployFunction = async (hre) => {
  const { deploy } = wrapperHRE(hre)
  const [deployer, receiver] = await ethers.getSigners()

  const investToken = '0xdAC17F958D2ee523a2206206994597C13D831ec7' // usdt eth
  // const start = 1689712200 // 22:00 start
  const start = 1689706800 // 22:00 start

  // const duration = 1135799 // for 22:00 start
  const duration = 1141199 // for 22:00 start

  // 23:59 = 1690847999

  const rounds = [
    { hardcap: 783_000_000_000, price: 290 },
    { hardcap: 1_287_000_000_000, price: 390 },
    { hardcap: 600_000_000_000, price: 500 },
  ] as RoundInfo[]
  const owner = '0x7d6465482E1e8F447D168F70a794D94392F56864'
  const investTokenReciever = '0x7d6465482E1e8F447D168F70a794D94392F56864'

  await deploy<Presale__factory>('Presale', {
    from: deployer.address,
    args: [investToken, start, duration, rounds, owner, investTokenReciever],
    log: true,
  })
}
export default func

func.tags = ['Presale.deploy']
