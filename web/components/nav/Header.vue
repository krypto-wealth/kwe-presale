<template>
  <header class="py-19px relative z-20 w-full bg-transparent">
    <div
      class="2md:px-15 3lg:px-33 mx-auto flex w-full max-w-[1600px] items-center justify-between px-3 md:px-10 lg:px-24"
    >
      <a href="https://www.kwe.network">
        <div class="header_logo">
          <img src="@/assets/img/logo.svg" alt="" />
        </div>
      </a>
      <nav v-if="!sm" class="gap-100px flex items-center justify-between text-white">
        <BaseInputSelect :options="rounds" v-model="model" class="w-143px" />
        <!-- TODO: back vesting -->
        <!-- <a href="https://gotbit-kwe-vesting-frontend-qa.test.gotbit.app/"> Vesting </a> -->
        <span class="cursor-not-allowed opacity-50"> Vesting </span>
      </nav>
      <div v-if="!login && !sm">
        <BaseButton
          outline
          class="h-[49px] w-[155px] !rounded-[90px] !text-[14px]"
          @click="dialogs.openDialog('connect', {}, { noCross: false })"
        >
          Connect wallet
        </BaseButton>
      </div>
      <div v-else class="relative flex items-center">
        <IconsWrongNetwork
          v-if="realChainId != chainId"
          class="mr-4 cursor-pointer"
          @mouseover="hover = true"
          @mouseleave="hover = false"
        />
        <div
          v-if="hover"
          class="wrong-network absolute -left-[150px] top-[40px] flex h-[50px] w-[171px] items-center rounded-[8px] bg-[#DE23663D] px-[17px] py-[13px]"
        >
          <IconsWrongNetwork />
          <p class="ml-[13px] w-[108px] text-[10px] text-[#DE2366]">
            An unsupported network is selected
          </p>
        </div>
        <IconsBurgerMenu
          class="burger cursor-pointer"
          v-if="sm"
          @click="logOutPopup = !logOutPopup"
        />

        <BaseButton
          v-else
          outline
          class="flex h-[49px] w-[174px] items-center justify-center !rounded-[90px] !text-[14px]"
          @click="logOutPopup = !logOutPopup"
          @mouseover="hoverIcon = true"
          @mouseleave="hoverIcon = false"
        >
          {{ walletLabel }}
          <div v-if="logOutPopup">
            <IconsArrowUp v-if="hoverIcon" class="ml-2" stroke="#000000" />
            <IconsArrowUp v-else class="ml-2" stroke="#FFFFFF" />
          </div>
          <div v-else>
            <IconsArrowDown v-if="hoverIcon" class="ml-2" stroke="#000000" />
            <IconsArrowDown v-else class="ml-2" stroke="#FFFFFF" />
          </div>
        </BaseButton>
        <SectionAccount
          :visible="logOutPopup"
          @updateVisible="updateVisible"
          class="right-[25px] top-[13px]"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { useDialogs } from '@/store/dialogs'
import { useMedia } from '~/utils/hooks'

const dialogs = useDialogs()

const { walletLabel, login, chainId, realChainId } = useWallet()
const { sm } = useMedia()

const isColor = ref(false)
const logOutPopup = ref(false)
const hover = ref(false)
const hoverIcon = ref(false)
const rounds = ref([
  { value: 'seed', label: 'Seed round' },
  { value: 'private', label: 'Private round' },
  { value: 'public', label: 'Public round' },
])

const model = ref('public')

const { y } = useWindowScroll()

const updateVisible = (newValue: boolean) => {
  logOutPopup.value = newValue
}

watch(
  () => y.value,
  (value) => {
    if (value > 100) {
      isColor.value = true
    } else isColor.value = false
  }
)
</script>

<style lang="scss" scoped>
.header {
  transition-duration: 500ms;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  position: fixed;
  z-index: 10;
  // @include py(12px);
  // @include for-size(lg) {
  //   @include py(20px);
  // }
  // @include px(24px);
  // @include for-size(md) {
  //   @include px(32px);
  // }
  // @include for-size(xl) {
  //   @include px(98px);
  // }
  &_logo {
    display: flex;
    align-items: center;

    &__image {
      width: 46px;
      // @include for-size(1024px) {
      //   width: 65px;
      //   margin-right: 16px;
      // }
    }
    &__title {
      font-size: 28px;
      color: #000;
      margin-left: 8px;
    }
  }
}

.burger {
  position: static;

  @media only screen and (max-width: 640px) {
    position: relative !important;
  }
}
</style>
