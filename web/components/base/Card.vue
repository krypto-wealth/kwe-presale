<!-- <script setup lang="ts">
export interface BaseCardProps {
  ghost?: boolean
  dark?: boolean
  default?: boolean
  info?: boolean
  transparent?: boolean
  wallet?: boolean
}
const props = defineProps<BaseCardProps>()
</script>

<template>
  <div
    class="default rounded-10px px-24px py-18px px-5"
    :class="{
      'ghost rounded-18px py-22px px-15px': props.ghost,
      'rounded-5px dark ': props.dark,
      transparent: props.transparent,
      info: props.info,
      wallet: props.wallet,
    }"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.default {
  background: linear-gradient(
    10deg,
    rgba(255, 255, 255, 0),
    rgba(128, 79, 245, 0.3717),
    rgba(255, 255, 255, 0)
  );
  background-color: #000000ed;
}

.info {
  background: radial-gradient(
    80% 80% at 50% 50%,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  background-color: rgba(0, 0, 0, 0.7);
}

.ghost {
  background: linear-gradient(
    10deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0)
  );
  background-color: #ffffff0a;
}

.dark {
  background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(255, 255, 255, 0.072) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
}

.transparent {
  background: linear-gradient(
    10deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0)
  );
}

.wallet {
  background: rgba(0, 0, 0, 0.4);
}
</style> -->
<template>
  <div class="card rounded-16px p-4" ref="card">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.card {
  background: linear-gradient(
    170.16deg,
    rgba(0, 16, 24, 0.5328) 6.14%,
    rgba(0, 14, 22, 0.2368) 92.61%
  );
  border: 0.5px solid rgba($color: #fff, $alpha: 0.3);
}
</style>

<script setup lang="ts">
export interface CardProps {
  color?: string
  radius?: string

  width?: string
  height?: string

  shadow?: boolean
}

const props = withDefaults(defineProps<CardProps>(), {})
const card = ref<HTMLDivElement>()

onMounted(() => {
  try {
    const tag = card.value
    if (!tag) return

    tag.style.borderRadius = props.radius ?? tag.style.borderRadius
    tag.style.backgroundColor = props.color ?? tag.style.backgroundColor
    tag.style.width = props.width ?? tag.style.width
    tag.style.height = props.height ?? tag.style.height
    tag.style.boxShadow = props.shadow ? '0px 4px 24px rgba(0, 0, 0, 0.07)' : 'none'
  } catch (e) {
    console.error(e)
  }
})
</script>
