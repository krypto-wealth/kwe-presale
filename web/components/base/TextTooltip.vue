<template>
  <div class="relative flex">
    <p
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      :class="
        props.hoverText ? `hover:text-[${props.hoverText}]` : 'hover:text-[#03e287]'
      "
    >
      <span :class="opacity ? 'opacity-60' : ''"> {{ props.label }}</span>
    </p>
    <div
      class="tooltip-hint whitespace-nowrap"
      :class="[tooltipPosition, { 'tooltip-hint__hover': hover }]"
    >
      {{ hint }}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Position } from '@/utils/helpers'

export interface TextTooltip {
  label?: string | number
  hint?: string | number
  position: Position
  hoverText?: string
  opacity?: boolean
}

const props = defineProps<TextTooltip>()
const hover = ref<boolean>(false)
const tooltipPosition = computed((): Position => {
  if (windowWidth.value < 1024) return 'top'
  else return props.position
})

const windowWidth = ref<number>(window.innerWidth)
const onWidthChange = () => (windowWidth.value = window.innerWidth)

onMounted(() => window.addEventListener('resize', onWidthChange))
onUnmounted(() => window.removeEventListener('resize', onWidthChange))
</script>
<style scoped lang="scss">
.tooltip-hover {
  opacity: 0.45;
}

.tooltip-hint {
  position: absolute;
  display: none;
  background-color: rgba(27, 44, 57, 0.3);
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 12px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #fff;
  backdrop-filter: blur(3px);
  z-index: 20;

  &__hover {
    display: block;
  }

  &.right {
    left: 40px;
    top: -75%;

    &:before {
      content: '';
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 8px solid #000;
      left: -8px;
      top: calc(50% - 8px);
    }
  }

  &.bottom {
    right: -50px;
    top: 50px;

    &:before {
      content: '';
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #000;
      left: calc(100% - 68px);
      bottom: 100%;
    }
  }

  &.left {
    right: 40px;
    top: -200%;
    text-align: start;
    &:before {
      content: '';
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid #000;
      right: -8px;
      top: calc(50% - 8px);
    }
  }

  &.top {
    right: -20px;
    bottom: 24px;
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    z-index: 100 !important;
    &:before {
      content: '';
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      // border-left: 8px solid transparent;
      // border-right: 8px solid transparent;
      // border-top: 8px solid rgb(27, 44, 57);
      left: calc(100% - 68px);
      top: 100%;
      z-index: 100 !important;
    }
  }
}
</style>
~/utils/helpers
