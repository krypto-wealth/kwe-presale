<template>
  <div
    :menu="props.menu"
    v-if="props.visible"
    class="-right-12px -top-23px absolute min-h-[50px] w-[100vw] rounded-none shadow-2xl md:right-[82px] md:top-[69px] md:w-full md:rounded-[15px]"
  >
    <div
      class="dropdown flex flex-col items-center justify-between rounded-none border border-[#03e287] p-[26px] text-white sm:pb-9 md:w-[221px] md:rounded-[20px] md:border-none md:px-6"
    >
      <div class="mb-6 flex w-full items-center justify-between self-start" v-if="sm">
        <img src="@/assets/img/logo.svg" alt="" />
        <IconsClose
          color="#ffffff"
          size="36"
          class="mb-3 flex cursor-pointer items-center"
          @click="changePropValue"
        />
      </div>
      <nav
        class="w-210px text-20px flex items-start justify-between text-white md:hidden"
      >
        <div>
          <p class="mb-4 flex items-center text-[#03e287]" @click="presale = !presale">
            <span>Presale</span>
            <IconsArrowUp v-if="presale" class="ml-2" stroke="#03e287" />
            <IconsArrowDown v-else class="ml-2" stroke="#03e287" />
          </p>

          <div
            v-if="presale"
            class="text-15px flex flex-col gap-4 transition duration-300"
          >
            <nuxt-link
              to="/seed"
              :class="
                unref(router.currentRoute).fullPath === '/seed'
                  ? 'text-[#03e287]'
                  : 'text-white text-opacity-60 hover:text-opacity-100'
              "
              >Seed Round</nuxt-link
            >
            <nuxt-link
              to="/private"
              :class="
                unref(router.currentRoute).fullPath === '/private'
                  ? 'text-[#03e287]'
                  : 'text-white text-opacity-60 hover:text-opacity-100'
              "
              >Private Round</nuxt-link
            >
            <nuxt-link
              to="/"
              :class="
                unref(router.currentRoute).fullPath === '/'
                  ? 'text-[#03e287]'
                  : 'text-white text-opacity-60 hover:text-opacity-100'
              "
              >Public Round</nuxt-link
            >
          </div>
        </div>

        <span class="cursor-not-allowed opacity-50"> Vesting </span>
      </nav>
      <div class="flex w-full items-baseline justify-between" v-if="login">
        <div class="flex flex-col">
          <div class="mb-[8px] flex items-center gap-[7px] sm:mb-[4px]">
            <IconsWalletType />
            <span class="text-[11px] font-semibold text-[#949494]">{{
              `${walletType?.charAt(0).toUpperCase()}${walletType?.slice(1)}`
            }}</span>
          </div>
          <span
            class="text-[15px]"
            :class="{
              'text-main-text': copyHover,
            }"
          >
            {{ walletLabel }}
          </span>
        </div>
        <div class="flex flex-col">
          <div v-if="sm" class="flex cursor-pointer items-center gap-[4px]">
            <IconsCopy :size="sm ? '24px' : '16px'" @click.stop="copyText()" />
            <span v-if="copied" v-auto-animate class="copied text-[15px] sm:text-[11px]"
              >Copy</span
            >
            <span v-if="!copied" class="text-[15px] sm:text-[11px]">Copy</span>
          </div>
          <div
            v-if="!sm"
            class="mt-[8px] hidden cursor-pointer items-center gap-[4px] sm:flex"
          >
            <IconsCopy :size="sm ? '24px' : '20px'" @click.stop="copyText()" />

            <span v-if="copied" v-auto-animate class="copied text-[15px] sm:text-[11px]"
              >Copy</span
            >
            <span v-if="!copied" class="text-[15px] sm:text-[11px]">Copy</span>
          </div>

          <div class="mt-[8px] flex cursor-pointer items-center gap-[4px]">
            <a
              :href="scannersLink.getAddress(chainId, wallet)"
              target="_blank"
              class="flex items-center gap-[4px]"
            >
              <IconsView :size="sm ? '24' : '16'" />
              <span class="text-[15px] sm:text-[11px] md:ml-1">View</span>
            </a>
          </div>
        </div>
      </div>
      <div class="bg-main-text mt-[16px] h-[1px] w-[215px] sm:w-[112px]"></div>
      <span
        v-if="login"
        class="text-main-card-text mt-2 w-full text-start text-[11px] text-[#949494] sm:mt-[16px]"
      >
        Your network is:
      </span>
      <div class="w-full" v-if="login">
        <div
          class="bg-main mt-[8px] flex h-[40px] w-full items-center gap-[12px] rounded-[8px] bg-[#03e28714] p-[16px] sm:w-full"
          v-if="realChainId === chainId"
        >
          <div class="w-[90%] text-start text-[10px] leading-[15px] sm:w-[60%]">
            <div>
              <div class="mr-1 flex items-center">
                <IconsEthereumIcon />
                <span class="ml-2 text-[12px] text-white">
                  {{ getChainDescription(realChainId).name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          :class="sm ? 'border-none' : 'border'"
          class="mt-[8px] flex h-[50px] w-full cursor-pointer items-center justify-center gap-[12px] rounded-[12px] border-[#DE2366] text-[#DE2366] sm:w-full"
        >
          <div
            class="wrong-network flex h-[50px] w-full items-center rounded-[8px] bg-[#DE23663D] px-[17px] py-[13px] md:bg-transparent"
          >
            <IconsWrongNetwork />
            <p class="ml-[13px] w-full text-[10px] text-[#DE2366]">
              An unsupported network is selected
            </p>
          </div>
        </div>
      </div>

      <div class="mt-[16px] w-full text-white" v-if="login">
        <div class="flex w-full justify-between">
          <div
            class="flex w-full justify-between text-[15px] font-semibold sm:text-[12px]"
          >
            <p>{{ kweSymbol }}</p>
            <p>{{ balanceKwe.ui }}</p>
          </div>
        </div>
        <div class="mt-4 flex w-full justify-between">
          <div
            class="flex w-full justify-between text-[15px] font-semibold sm:text-[12px]"
          >
            <p>{{ symbol }}</p>
            <p>{{ balance.ui }}</p>
          </div>
        </div>
      </div>
      <BaseButton
        primary
        @click="
          login ? disconnect() : dialogs.openDialog('connect', {}, { noCross: false })
        "
        class="mb-[14px] mt-[24px] h-[50px] w-full text-[14px] sm:mb-[0] sm:text-[14px] sm:font-normal md:h-[37px] md:w-[171px] md:font-bold"
      >
        {{ login ? 'Disconnect' : 'Connect wallet' }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { useMedia } from '~/utils/hooks'
import { scannersLink, getChainDescription } from '@gotbit/evm'
import { useReadTokenSymbol, useReadTokenBalance } from '@/contracts/investToken'
import { useReadKweTokenSymbol, useReadKweTokenBalance } from '~/contracts/Token'
import { useDialogs } from '~/store/dialogs'

interface DropdownProps {
  visible: boolean
  menu?: boolean
}

const { walletLabel, disconnect, realChainId, chainId, wallet, walletType } = useWallet()
const { data: symbol } = useReadTokenSymbol()
const { data: kweSymbol } = useReadKweTokenSymbol()
const { balanceKwe } = useReadKweTokenBalance()
const { balance } = useReadTokenBalance()

const props = defineProps<DropdownProps>()
const clipboard = useClipboard()
const { sm } = useMedia()
const router = useRouter()
const { login } = useWallet()
const dialogs = useDialogs()

const copied = ref(false)
const copyHover = ref(false)
const presale = ref(false)

const emit = defineEmits(['updateVisible'])

const changePropValue = () => {
  const newValue = !props.visible
  emit('updateVisible', newValue)
}

const copyText = async () => {
  copyHover.value = true
  await clipboard.copy(unref(wallet))
  copied.value = true
  copyHover.value = false
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<style scoped lang="scss">
.copied {
  font-weight: 600;
  z-index: 10;
  color: #03e287;
}

.dropdown {
  background: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(6px);
  z-index: 100;
  @media only screen and (max-width: 639px) {
    width: 100vw;
  }
}
</style>
