<template>
  <button
    class="button h-[50px] rounded-[8px] px-4"
    :class="{
      ...props,
    }"
    :disabled="props.disabled"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
export interface BaseButtonProps {
  primary?: boolean
  secondary?: boolean
  disabled?: boolean
  outline?: boolean
}

const props = defineProps<BaseButtonProps>()

const emit = defineEmits(['click'])
</script>

<style scoped lang="scss">
.button {
  transition-duration: 400ms;
  outline: transparent;

  &.primary {
    background: #30e287;
    color: #000;
    &:hover {
      background: transparent;
      color: #30e287;
      border: 1px solid #30e287;
    }
  }

  &.secondary {
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.12);
    border: 0.5px solid rgba(255, 255, 255, 0.4) !important;

    color: #fff;
    &:hover {
      background: linear-gradient(
          180deg,
          rgba(242, 242, 242, 0.15) 0%,
          rgba(242, 242, 242, 0.1) 100%
        ),
        linear-gradient(0deg, rgba(52, 52, 52, 0.12), rgba(52, 52, 52, 0.12));
    }
  }

  &:disabled {
    cursor: not-allowed;
    background: #428a64;
    &:hover {
      background: #41b378;
      border: none;
      color: #000;
    }
  }

  &.outline {
    background-color: transparent;
    border: 1px solid #03e287;
    color: #fff;
    &:hover {
      background: #03e287;
      color: #000;
    }
  }
}
</style>
