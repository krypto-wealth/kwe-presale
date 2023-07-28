<template>
  <div class="relative flex">
    <IconsTooltip
      class="cursor-pointer"
      :class="{ 'tooltip-hover': !hover }"
      @mouseenter="!sm ? (hover = true) : null"
      @mouseleave="!sm ? (hover = false) : null"
      size="20px"
      @click="hover = !hover"
    />
    <div
      class="tooltip-hint"
      :class="[tooltipPosition, { 'tooltip-hint__hover': hover }]"
    >
      {{ hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Position } from '@/utils/helpers'

export interface TooltipProps {
  position?: Position
  hint: string
}

const props = withDefaults(defineProps<TooltipProps>(), { position: 'right' })

const hover = ref<boolean>(false)

const { sm } = useMedia()

const tooltipPosition = computed((): Position => {
  if (windowWidth.value < 1024) return 'top'
  else return props.position
})

const windowWidth = ref<number>(window.innerWidth)
const onWidthChange = () => (windowWidth.value = window.innerWidth)

onMounted(() => window.addEventListener('resize', onWidthChange))
onUnmounted(() => window.removeEventListener('resize', onWidthChange))
</script>

<style lang="scss" scoped>
.tooltip-hover {
  opacity: 0.45;
}

.tooltip-hint {
  position: absolute;
  display: none;
  width: 288px;
  background-color: rgba(27, 44, 57, 0.3);
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 12px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #fff;

  z-index: 10;

  &__hover {
    display: block;
  }

  &.right {
    left: 40px;
    top: -75%;
  }

  &.bottom {
    right: -150px;
    top: 40px;
  }

  &.left {
    right: 40px;
    top: -200%;
    text-align: start;
  }

  &.top {
    right: -200px;
    bottom: 40px;
    text-align: left;
  }
}
</style>
