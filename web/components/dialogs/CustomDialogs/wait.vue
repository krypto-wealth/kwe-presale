<template>
  <div
    class="w-335px flex flex-col items-center gap-4 px-6 py-10 text-center md:w-[508px] md:px-8"
  >
    <h2 class="title text-[27px] font-semibold text-white">
      {{ title ?? 'Waiting for transaction' }}
    </h2>
    <p class="md:(mt-38px mb-[32px]) mb-2 mt-1 text-[16px] text-[#BDBDBD]">
      {{ text ?? 'It will take some time for the transaction to be completed.' }}
    </p>
    <BaseLoader />
  </div>
</template>

<script setup lang="ts">
export interface ErrorDialogProps {
  title?: string
  text?: string
}
const props = defineProps<ErrorDialogProps>()
</script>

<style scope lang="scss">
.title {
  font-family: 'FONTSPRING DEMO - Nekst';
}
</style>
