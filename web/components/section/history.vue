<template>
  <section
    v-if="login && userHistoryData?.length"
    class="mt-30 mx-auto w-full max-w-[1600px] items-center justify-between px-3 md:px-10 lg:px-24"
  >
    <h2 class="text-28px text-center font-semibold text-white md:text-start">
      Purchase history
    </h2>
    <HistoryTable :round="round" />
  </section>
</template>

<script setup lang="ts">
import { useReadTokenUserInvestmentInfo } from '~/contracts/Presale'

export interface HistorySectionProps {
  round: 0 | 1 | 2
}

const props = defineProps<HistorySectionProps>()

const { login } = useWallet()

const { data: userHistory } = useReadTokenUserInvestmentInfo()
const userHistoryData = computed(
  () => unref(userHistory)!.filter((h) => h[0] === props.round) ?? []
)
</script>

<style scoped>
h2 {
  font-family: 'FONTSPRING DEMO - Nekst';
}
</style>
