import { ethers, network } from 'hardhat'
import { expect } from 'chai'

// import { deploy } from '@/gotbit-tools/hardhat/utils/deploy'
import { useContracts } from '@/test'
import { deploy } from '@gotbit/evm-hardhat'

import {
  start,
  duration,
  rounds,
  RoundInfo,
} from '../deploy/localhost/02_Presale.deploy'

const publicRoundId = 2
const privateRoundId = 1
const seedRoundId = 0

describe('Presale contract', () => {
  beforeEach(async () => {
    await deploy()
    const { token, presale } = await useContracts()
    const [owner, receiver, user1, user2] = await ethers.getSigners()

    await token.transfer(
      user1.address,
      '1_000_000'.toBigNumber(await token.decimals())
    )

    await token.transfer(
      user2.address,
      '1_000_000'.toBigNumber(await token.decimals())
    )

    await token
      .connect(user1)
      .approve(presale.address, ethers.constants.MaxUint256)

    await token
      .connect(user2)
      .approve(presale.address, ethers.constants.MaxUint256)
  })
  it('correct init', async function () {
    const { token, presale } = await useContracts()
    const [owner, receiver, user1] = await ethers.getSigners()

    expect(await presale.duration()).to.be.equal(duration)
    expect(await presale.investToken()).to.be.equal(token.address)

    expect(await presale.owner()).to.be.equal(owner.address)
    expect(await presale.investTokenReceiver()).to.be.equal(receiver.address)

    expect((await presale.rounds(0)).hardcap).to.be.equal(rounds[0].hardcap)
    expect((await presale.rounds(0)).price).to.be.equal(rounds[0].price)

    expect((await presale.rounds(1)).hardcap).to.be.equal(rounds[1].hardcap)
    expect((await presale.rounds(1)).price).to.be.equal(rounds[1].price)

    expect((await presale.rounds(2)).hardcap).to.be.equal(rounds[2].hardcap)
    expect((await presale.rounds(2)).price).to.be.equal(rounds[2].price)
  })
  it('deploy reverts with incorrect params', async function () {
    const { token, presale } = await useContracts()
    const [owner, receiver, user1] = await ethers.getSigners()

    const start = parseInt((Date.now() / 1000).toString()) + 1000
    const duration = 24 * 3600 * 7

    const rounds = [
      { hardcap: 600_000_000_000, price: 290 },
      { hardcap: 300_000_000_000, price: 390 },
      { hardcap: 100_000_000_000, price: 500 },
    ] as RoundInfo[]

    const factory = await ethers.getContractFactory('Presale')

    await expect(
      factory.deploy(
        ethers.constants.AddressZero,
        start,
        duration,
        rounds,
        receiver.address,
        owner.address
      )
    ).to.be.revertedWith('ZeroAddress()')

    await expect(
      factory.deploy(
        token.address,
        start,
        duration,
        rounds,
        ethers.constants.AddressZero,
        owner.address
      )
    ).to.be.revertedWith('ZeroAddress()')

    await expect(
      factory.deploy(
        token.address,
        start,
        duration,
        rounds,
        receiver.address,
        ethers.constants.AddressZero
      )
    ).to.be.revertedWith('ZeroAddress()')

    await expect(
      factory.deploy(
        token.address,
        start,
        duration,
        [],
        receiver.address,
        owner.address
      )
    ).to.be.revertedWith('ZeroRounds()')

    await expect(
      factory.deploy(
        token.address,
        0,
        duration,
        rounds,
        receiver.address,
        owner.address
      )
    ).to.be.revertedWith('IncorrectStartTimestamp()')

    await expect(
      factory.deploy(
        token.address,
        start,
        0,
        rounds,
        receiver.address,
        owner.address
      )
    ).to.be.revertedWith('ZeroDuration()')
  })
  it('correct invest tokens flow', async function () {
    const { token, presale } = await useContracts()
    const [owner, receiver, user1] = await ethers.getSigners()

    const currentTimestamp = (await presale.provider.getBlock('latest'))
      .timestamp

    await network.provider.send('evm_increaseTime', [
      start - currentTimestamp + 1,
    ])

    const investAmount = '1000'.toBigNumber(await token.decimals())

    await expect(
      presale.connect(user1).invest(0, publicRoundId)
    ).to.be.revertedWith('ZeroInvest()')

    await expect(() =>
      presale.connect(user1).invest(investAmount, publicRoundId)
    ).changeTokenBalances(
      token,
      [receiver, user1],
      [investAmount, investAmount.mul(-1)]
    )

    const userInvestments = await presale.getUserInvestmentInfo(user1.address)

    expect(userInvestments.length).to.be.equal(1)
    expect(userInvestments[0].roundId).to.be.equal(publicRoundId)
    expect(userInvestments[0].amount).to.be.equal(investAmount)
  })
  it('fails to invest if presale is not active', async function () {
    const { token, presale } = await useContracts()
    const [owner, receiver, user1] = await ethers.getSigners()

    const currentTimestamp = (await presale.provider.getBlock('latest'))
      .timestamp

    const investAmount = '1000'.toBigNumber(await token.decimals())

    await expect(
      presale.connect(user1).invest(investAmount, publicRoundId)
    ).to.be.revertedWith('PresaleNotActive()')

    await network.provider.send('evm_increaseTime', [
      start + duration - currentTimestamp + 1,
    ])
    await expect(
      presale.connect(user1).invest(investAmount, publicRoundId)
    ).to.be.revertedWith('PresaleNotActive()')
  })
  it('fails to invest over hardcap', async function () {
    const { token, presale } = await useContracts()
    const [owner, receiver, user1] = await ethers.getSigners()

    const currentTimestamp = (await presale.provider.getBlock('latest'))
      .timestamp

    await network.provider.send('evm_increaseTime', [
      start - currentTimestamp + 1,
    ])

    const remain = '100'.toBigNumber(await token.decimals())

    const investAmount = (await presale.rounds(publicRoundId)).hardcap.sub(
      remain
    )

    await presale.connect(user1).invest(investAmount, publicRoundId)

    await expect(
      presale.connect(user1).invest(remain.add(1), publicRoundId)
    ).to.be.revertedWith('HardcapAccomplished()')

    await expect(presale.connect(user1).invest(remain, publicRoundId)).to.be.not
      .reverted
  })
  it('multi invest', async function () {
    const { token, presale } = await useContracts()
    const [owner, receiver, user1, user2] = await ethers.getSigners()

    const currentTimestamp = (await presale.provider.getBlock('latest'))
      .timestamp

    await network.provider.send('evm_increaseTime', [
      start - currentTimestamp + 1,
    ])

    const investAmount = '1000'.toBigNumber(await token.decimals())

    await presale.connect(user1).invest(investAmount, publicRoundId)

    await presale.connect(user2).invest(investAmount, publicRoundId)

    await presale.connect(user1).invest(investAmount, publicRoundId)

    await presale.connect(user1).invest(investAmount, publicRoundId)

    await presale.connect(user1).invest(investAmount, privateRoundId)
    await presale.connect(user1).invest(investAmount, privateRoundId)

    await presale.connect(user2).invest(investAmount, publicRoundId)

    await presale.connect(user1).invest(investAmount, privateRoundId)
    await presale.connect(user1).invest(investAmount, privateRoundId)
    await presale.connect(user2).invest(investAmount, publicRoundId)

    await presale.connect(user1).invest(investAmount, seedRoundId)

    const allocations1 = await presale.getUserAllocations(user1.address)
    const allocations2 = await presale.getUserAllocations(user2.address)

    const priceSeed = (await presale.rounds(seedRoundId)).price
    const pricePrivate = (await presale.rounds(privateRoundId)).price
    const pricePublic = (await presale.rounds(publicRoundId)).price

    expect(allocations1[publicRoundId]).to.be.equal(
      investAmount.mul(3).mul(10_000).div(pricePublic)
    )

    expect(allocations1[privateRoundId]).to.be.equal(
      investAmount.mul(4).mul(10_000).div(pricePrivate)
    )

    expect(allocations1[seedRoundId]).to.be.equal(
      investAmount.mul(1).mul(10_000).div(priceSeed)
    )

    expect(allocations2[publicRoundId]).to.be.equal(
      investAmount.mul(3).mul(10_000).div(pricePublic)
    )

    expect(allocations2[seedRoundId]).to.be.equal(0)
    expect(allocations2[privateRoundId]).to.be.equal(0)
  })
  describe('admin functions', function () {
    it('setting receiver wallet only owner', async function () {
      const { token, presale } = await useContracts()
      const [owner, receiver, user1, user2] = await ethers.getSigners()

      await expect(
        presale.connect(user1).setReceiverWallet(user1.address)
      ).to.be.revertedWith('Ownable: caller is not the owner')

      await expect(
        presale.setReceiverWallet(ethers.constants.AddressZero)
      ).to.be.revertedWith('ZeroAddress()')

      await presale.setReceiverWallet(owner.address)

      expect(await presale.investTokenReceiver()).to.be.equal(owner.address)
    })
    it('rounds addition only owner', async function () {
      const { token, presale } = await useContracts()
      const [owner, receiver, user1, user2] = await ethers.getSigners()

      const rounds = [
        { hardcap: 600_000_000_000, price: 290 },
        { hardcap: 300_000_000_000, price: 390 },
        { hardcap: 100_000_000_000, price: 500 },
      ] as RoundInfo[]

      await expect(presale.connect(user1).addRounds(rounds)).to.be.revertedWith(
        'Ownable: caller is not the owner'
      )

      await expect(presale.addRounds([])).to.be.revertedWith('ZeroRounds()')

      await presale.addRounds(rounds)

      expect((await presale.rounds(3)).hardcap).to.be.equal(rounds[0].hardcap)
      expect((await presale.rounds(3)).price).to.be.equal(rounds[0].price)

      expect((await presale.rounds(4)).hardcap).to.be.equal(rounds[1].hardcap)
      expect((await presale.rounds(4)).price).to.be.equal(rounds[1].price)

      expect((await presale.rounds(5)).hardcap).to.be.equal(rounds[2].hardcap)
      expect((await presale.rounds(5)).price).to.be.equal(rounds[2].price)
    })
  })
})
