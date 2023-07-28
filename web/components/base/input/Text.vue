<template>
  <div class="relative w-full">
    <div class="flex h-full flex-col">
      <input
        type="text"
        v-bind="props"
        v-model="value"
        class="rounded-l-12px h-full border p-4"
        :class="{ invalid: errorMessage }"
        :placeholder="placeholder"
        :disabled="disabled"
      />
      <span
        class="absolute bottom-[-36%] whitespace-nowrap"
        :class="{ invalid: !isValid }"
      >
        {{ errorMessage }}
      </span>
    </div>
    <button
      class="input-button right-60px md:right-81px absolute top-[20px] font-bold text-[#03e287]"
      :disabled="props.disabled"
      @click="value = props.maxValue"
    >
      MAX
    </button>
    <slot></slot>
    <div
      class="widget w-130px md:w-174px h-64px -right-129px md:-right-173px rounded-r-12px px-10px absolute top-0 flex items-center justify-between border border-white border-opacity-40 md:px-6"
      :class="{ invalid: errorMessage }"
    >
      <BaseTextTooltip
        :label="parseString(widget)"
        :hint="widget"
        position="top"
        class="font-seminbold text-15px text-white"
      />
      <p class="text-white">{{ 'KWE' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface InputProps {
  modelValue?: string
  placeholder?: string
  isValid?: boolean
  errorMessage?: string
  disabled?: boolean
  maxValue?: string
  widget?: string
}

const props = defineProps<InputProps>()
const emit = defineEmits(['update:modelValue'])

const widget = computed(() => props.widget)

const value = computed({
  get: () => props.modelValue,
  set: (text) => emit('update:modelValue', text),
})

const parseString = (string: string | undefined) => {
  if (string?.length! > 6) {
    return string?.slice(0, 7) + '...'
  }
  if (isNaN(+string!)) {
    return '0'
  }
  if (string) {
    return parseFloat(string).toFixed(2)
  } else return '0'
}
</script>

<style lang="scss" scoped>
input[type='text'] {
  background: var(
    --2,
    linear-gradient(175deg, rgba(0, 16, 24, 0.53) 0%, rgba(0, 14, 22, 0.24) 100%)
  );
  font-weight: 400;
  font-size: 16px;
  outline: none;
  border: 0.75px solid var(--white, rgba(255, 255, 255, 0.3));
  color: #fff;

  &.invalid {
    border-color: #ff1919;
  }

  &::placeholder {
    color: gray;
  }
}

.widget {
  background: var(
    --2,
    linear-gradient(175deg, rgba(0, 16, 24, 0.53) 0%, rgba(0, 14, 22, 0.24) 100%)
  );
  &.invalid {
    border-color: #ff1919;
  }
}

span {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  letter-spacing: -0.5px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: rgb(208, 56, 56);
  display: none;

  &.invalid {
    display: inline;
  }
}
</style>
