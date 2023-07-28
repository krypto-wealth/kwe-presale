<template>
  <IconsBase v-bind="props">
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.75 10.5L8.25 6L3.75 1.5"
        stroke="white"
        stroke-opacity="0.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </IconsBase>
</template>

<script setup lang="ts">
import type { IconProps } from '@/components/icons/Base.vue'

interface ArrowDown extends IconProps {}
const props = defineProps<ArrowDown>()
</script>
