<template>
  <div>
    <h1 class="text-47px mt-12 text-center font-semibold text-white">Public round</h1>
    <div
      class="3lg:justify-between mx-auto mt-12 flex w-full max-w-[1600px] flex-wrap items-center justify-center px-3 md:px-10 lg:px-24"
    >
      <SectionBuy :round="PUBLIC_ROUND" amount="600 000" />
      <SectionInfo :round="PUBLIC_ROUND" class="3lg:mt-0 mt-15" />
    </div>
    <SectionHistory :round="PUBLIC_ROUND" />
  </div>
</template>

<script setup lang="ts">
import { PUBLIC_ROUND } from '~/utils/helpers'
</script>

<style scoped>
h1 {
  font-family: 'FONTSPRING DEMO - Nekst';
}
</style>
