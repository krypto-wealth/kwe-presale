<template>
  <IconsBase v-bind="props">
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 7L6 2L1 7" :stroke="props.color" stroke-width="1.5" />
    </svg>
  </IconsBase>
</template>

<script setup lang="ts">
import type { IconProps } from '@/components/icons/Base.vue'

interface ArrowUp extends IconProps {}
const props = defineProps<ArrowUp>()
</script>
