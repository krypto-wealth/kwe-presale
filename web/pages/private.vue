<template>
  <div>
    <h1 class="text-47px mt-12 text-center font-semibold text-white">Private round</h1>
    <div
      class="3lg:justify-between mx-auto mt-12 flex w-full max-w-[1600px] flex-wrap items-center justify-center px-3 md:px-10 lg:px-24"
    >
      <SectionBuy :round="PRIVATE_ROUND" amount="1 287 000" />
      <SectionInfo :round="PRIVATE_ROUND" class="3lg:mt-0 mt-15" />
    </div>
    <SectionHistory :round="PRIVATE_ROUND" />
  </div>
</template>

<script setup lang="ts">
import { PRIVATE_ROUND } from '~/utils/helpers'
</script>
<style scoped>
h1 {
  font-family: 'FONTSPRING DEMO - Nekst';
}
</style>
