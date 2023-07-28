<template>
  <div
    class="w-335px flex flex-col items-center gap-4 px-6 py-10 text-center md:w-[508px] md:px-8"
  >
    <h2 class="title text-[28px] font-semibold text-[#03E287]">
      {{ title ?? 'Success' }}
    </h2>
    <p
      class="mt-24px w-246px md:w-361px leading-28px text-14px text-[#BDBDBD] md:text-[16px]"
    >
      {{
        text ??
        'Transaction successfully completed. You can follow the information of your operation with the transaction hash:'
      }}
    </p>
    <div
      v-if="props.txHash && props.chainId"
      class="relative mb-8 flex items-center gap-[6px]"
    >
      <a
        :href="scannersLink.getTx(props.chainId, props.txHash)"
        target="_blank"
        class="text-14px md:text-16px font-medium text-white hover:underline"
      >
        {{ txHash?.shortAddress(20, 7) }}
      </a>
      <span
        v-if="copied"
        v-auto-animate
        class="text-12px -top-16px absolute right-0 z-10 font-bold text-[#03e287]"
      >
        Copied!
      </span>
      <div class="cursor-pointer" @click="copyText(txHash)">
        <IconsCopy size="24px" @click.stop="copyText(txHash)" />
      </div>
    </div>
    <BaseButton
      primary
      @click="dialog.closeCurrentDialog"
      class="sm:(max-w-[370px]) h-50px w-full max-w-[152px]"
    >
      {{ btnTitle ?? 'Home Page' }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { useDialogs } from '@/store/dialogs'
import { ChainId } from '@gotbit/evm'
import { scannersLink } from '@gotbit/evm'

export interface ErrorDialogProps {
  title: string
  text: string
  btnTitle: string
  txHash: string
  chainId?: ChainId
}
const props = defineProps<ErrorDialogProps>()
console.log(props)
const dialog = useDialogs()

const copied = ref(false)

const copyText = (text: string) => {
  navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<style scope lang="scss">
.title {
  font-family: 'FONTSPRING DEMO - Nekst';
}
</style>
