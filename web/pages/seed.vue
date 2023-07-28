<template>
  <div>
    <h1 class="text-47px mt-12 text-center font-semibold text-white">Seed round</h1>
    <div
      class="3lg:justify-between mx-auto mt-12 flex w-full max-w-[1600px] flex-wrap items-center justify-center px-3 md:px-10 lg:px-24"
    >
      <SectionBuy :round="SEED_ROUND" amount="783 000" />
      <SectionInfo :round="SEED_ROUND" class="3lg:mt-0 mt-15" />
    </div>
    <SectionHistory :round="SEED_ROUND" />
  </div>
</template>

<script setup lang="ts">
import { SEED_ROUND } from '~/utils/helpers'
</script>

<style scoped>
h1 {
  font-family: 'FONTSPRING DEMO - Nekst';
}
</style>
