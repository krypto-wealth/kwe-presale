<template>
  <IconsBase v-bind="props">
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6L8 11L13 6"
        :stroke="props.color"
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
