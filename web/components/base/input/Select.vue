<template>
  <div class="relative flex cursor-pointer flex-col" :class="{ activeDrop: active }">
    <div class="main-body flex select-none flex-col">
      <div
        class="flex items-center self-start md:self-end"
        @click="active = !active"
        ref="dropdown"
      >
        <span class="label whitespace-nowrap">{{ 'Presale' }}</span>

        <IconsArrowDown v-if="active" class="ml-2" stroke="#03E287" />
        <IconsArrowUp v-else class="ml-2" stroke="#03E287" />
      </div>
    </div>
    <div
      class="dropdown-body absolute left-[50px] top-[35px] z-[10] rounded-[10px]"
      v-if="active"
    >
      <div
        class="text-15px leading-23px cursor-pointer items-center justify-start rounded-md py-[7px] text-center"
        :class="{
          'not-active  !text-[#FFFFFFCC] hover:!text-white': mainLabel !== option.label,
          'text-[#03e287]':
            unref(router.currentRoute).fullPath == `/${option.value}` ||
            unref(router.currentRoute).fullPath == '/',
        }"
        v-for="option of props.options"
        :key="option.value"
        @click="() => onSelect(option.value)"
      >
        <nuxt-link :to="option.value == 'public' ? '/' : `/${option.value}`">
          {{ option.label }}</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const router = useRouter()

interface ISelectorOptions {
  value: string | number
  label: string
}

interface SelectorProps {
  options: ISelectorOptions[]
  modelValue?: string | number
  dropdownWidth?: string
}

console.log(unref(router.currentRoute).fullPath)

const emit = defineEmits(['update:modelValue', 'press'])
const props = defineProps<SelectorProps>()

const active = ref(false)
const dropdown = ref<HTMLElement>()
const mainLabel = ref('')

onClickOutside(dropdown, () => {
  active.value = false
})

onMounted(() => {
  mainLabel.value = props.options.filter(
    (option) => option.value === props.modelValue
  )[0].label
})

function onSelect(value: string | number) {
  emit('update:modelValue', value)
  emit('press')
  mainLabel.value = props.options.filter((option) => option.value === value)[0].label
}
</script>

<style lang="scss" scoped>
.label {
  color: #03e287;
  font-size: 16px;
}
.main-body {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.5px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.06);
}

.dropdown-body {
  width: 100%;
  padding: 16px 16px 16px 16px;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: -0.5px;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 0.5px solid rgba(27, 47, 54, 0.4);
}

.not-active {
  color: black;
  transition: 0.5s;
}
</style>
