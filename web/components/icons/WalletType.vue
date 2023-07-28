<template>
  <div class="flex h-[18px] w-[18px] items-center justify-center">
    <IconsMetamask v-if="walletType === 'metamask'" size="18px" />
    <IconsWalletconnect v-if="walletType === 'walletconnect'" size="18px" />
    <IconsTrustWallet v-if="walletType === 'trustwallet'" size="18px" />
  </div>
</template>

<script lang="ts" setup>
const { walletType } = useWallet()
</script>

<style lang="scss" scoped></style>
