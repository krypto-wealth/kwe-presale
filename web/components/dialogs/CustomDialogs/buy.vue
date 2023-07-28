<template>
  <div
    class="w-335px flex flex-col items-center gap-4 px-6 py-10 text-center md:w-[508px] md:px-8"
  >
    <h2 class="title text-[28px] font-semibold text-white">Buy</h2>
    <p class="mt-24px mb-[32px] text-[16px] text-[#BDBDBD]">
      {{ text ?? 'Buy' }}
    </p>
    <div class="flex w-full justify-between gap-[10px]">
      <BaseButton
        outline
        @click="dialog.closeCurrentDialog"
        class="sm:(max-w-[195px] h-[48px]) h-[48px] w-full max-w-[152px]"
      >
        Cancel
      </BaseButton>
      <BaseButton
        primary
        @click="
          () => {
            props.onConfirm()
            dialog.closeCurrentDialog()
          }
        "
        class="sm:(max-w-[195px] h-[48px]) h-[48px] w-full max-w-[152px]"
      >
        {{ btnTitle ?? 'Buy' }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDialogs } from '@/store/dialogs'

export interface ErrorDialogProps {
  title?: string
  text?: string
  btnTitle?: string
  onConfirm: () => any
}
const props = defineProps<ErrorDialogProps>()
const dialog = useDialogs()
</script>

<style scoped lang="scss">
.title {
  font-family: 'FONTSPRING DEMO - Nekst';
}
</style>
