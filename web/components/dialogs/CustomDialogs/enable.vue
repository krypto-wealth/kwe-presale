<template>
  <div
    class="w-335px flex flex-col items-center gap-4 px-6 py-10 text-center md:w-[508px] md:px-8"
  >
    <h2 class="title text-[28px] font-semibold text-white">Enable</h2>
    <p class="mt-24px mb-[32px] text-[16px] text-[#BDBDBD]">
      {{
        text ?? 'You need to enable interaction with the service to transfer your tokens.'
      }}
    </p>
    <div
      class="gap-20px mt-5 flex w-full flex-col justify-between md:flex-row md:gap-[10px]"
    >
      <BaseButton
        outline
        @click="dialog.closeCurrentDialog"
        class="md:(max-w-[195px] h-[48px]) h-[48px] w-full"
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
        class="md:(max-w-[195px] h-[48px]) h-[48px] w-full"
      >
        {{ btnTitle ?? 'Okay' }}
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
