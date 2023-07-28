<template>
  <BaseIcon v-bind="props">
    <svg
      :width="props.size"
      :height="props.size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 7L17 17" stroke="#505050" stroke-width="1.5" />
      <path d="M17 7L7 17" stroke="#505050" stroke-width="1.5" />
    </svg>
  </BaseIcon>
</template>

<script setup lang="ts">
export interface IconProps {
  size?: string
  color?: string
  stroke?: string
  transform?: string
}

const props = defineProps<IconProps>()
</script>
