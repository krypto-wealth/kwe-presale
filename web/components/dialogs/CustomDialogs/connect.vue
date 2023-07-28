<template>
  <div class="connect-dialog w-[311px] px-6 py-14 md:w-[508px]">
    <div class="title">
      <div class="connect-title text-[27px] text-white md:text-[32px]">
        Connect wallet
      </div>
      <div class="small-text mt-10px text-sm text-[#BDBDBD] md:text-base">
        Choose your wallet provider to access more functionality
      </div>
    </div>
    <div class="gap-19px flex flex-col items-center text-[15px] font-semibold md:mt-10">
      <BaseButton
        secondary
        class="flex h-[50px] w-full items-center justify-center md:w-[340px]"
        @click="handleConnectMetamask(), dialogs.closeCurrentDialog()"
      >
        <IconsMetamask class="mr-1" />
        MetaMask
      </BaseButton>
      <BaseButton
        secondary
        class="flex h-[50px] w-full items-center justify-center md:w-[340px]"
        @click="connect('walletconnect'), dialogs.closeCurrentDialog()"
      >
        <IconsWalletconnect class="mr-1" />
        WalletConnect
      </BaseButton>
      <BaseButton
        v-if="!sm"
        secondary
        class="flex h-[50px] w-full items-center justify-center md:w-[340px]"
        @click="connect('trustwallet'), dialogs.closeCurrentDialog()"
      >
        <IconsTrustWallet class="mr-1" />Trust Wallet</BaseButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDialogs } from '@/store/dialogs'

const dialogs = useDialogs()
const { connect } = useWallet()
const { sm } = useMedia()

const handleConnectMetamask = () => {
  if (
    /Android|iPhone/i.test(navigator.userAgent) &&
    !Boolean((window as any).ethereum?.isMetaMask)
  ) {
    // window.open(
    //   'https://metamask.app.link/dapp/gotbit-kwe-presale-frontend-qa.test.gotbit.app/'
    // )
    window.open('https://metamask.app.link/dapp/presale.kwe.network/')
  } else connect('metamask')
}
</script>

<style scoped lang="scss">
.connect-dialog {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
}

.small-text {
  font-style: normal;
  font-weight: 400;
  text-align: center;
  letter-spacing: -0.5px;
  font-feature-settings: 'pnum' on, 'lnum' on;
}

.connect-title {
  font-family: 'FONTSPRING DEMO - Nekst';
}
</style>
