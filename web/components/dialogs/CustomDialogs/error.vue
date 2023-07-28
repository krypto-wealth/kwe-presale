<template>
  <div
    class="spacing-[22.4px] w-335px flex flex-col items-center gap-4 px-6 py-10 text-center md:w-[508px] md:px-8"
  >
    <h2 class="title text-[28px] font-semibold text-[#EB5757]">
      {{ title ?? 'Error' }}
    </h2>
    <p class="mt-24px mb-[32px] text-[16px] text-[#BDBDBD]">
      {{ text ?? 'Warning! An error has occurred. Please try again.' }}
    </p>
    <BaseButton
      primary
      @click="dialog.closeCurrentDialog"
      class="sm:(max-w-[317px] h-14) h-12 w-[317px]"
    >
      {{ btnTitle ?? 'Try Again!' }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { useDialogs } from '@/store/dialogs'

export interface ErrorDialogProps {
  title?: string
  text?: string
  btnTitle?: string
}
const props = defineProps<ErrorDialogProps>()
const dialog = useDialogs()
</script>

<style scope lang="scss">
.title {
  font-family: 'FONTSPRING DEMO - Nekst';
}
</style>
