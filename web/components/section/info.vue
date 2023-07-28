<template>
  <section>
    <h2
      class="text-24px md:(text-28px mt-0) mt-8 text-left text-center font-semibold text-white"
    >
      Info board
    </h2>
    <BaseCard
      v-if="sm"
      class="!rounded-12px w-343px w-ful p-36px mt-10 flex h-full flex-col items-center"
    >
      <div class="text-12px flex justify-between"></div>
      <div class="gap-25px text-12px flex">
        <div class="flex flex-col gap-6 text-white text-opacity-60">
          <p class="h-12px flex items-center">
            <span class="text-right">TGE date</span>
            <BaseTooltip position="top" :hint="hint" class="ml-3" />
          </p>
          <p>Presale start date</p>
          <p>Presale end date</p>
          <p>Investment round</p>
          <p>Date of the nearest unlock</p>
          <p>{{ kweSymbol }} token price</p>
        </div>
        <div class="flex flex-col gap-6 text-right text-white">
          <BaseTextTooltip
            label="August 1, 2023"
            hint="August 1, 2023, 00:00:00 UTC"
            position="top"
          />
          <BaseTextTooltip
            :label="formatDate(unref(startDate)!).formattedDateLabel"
            :hint="formatDate(unref(startDate)!).formattedDateFull"
            position="top"
            class="flex justify-end"
          />
          <BaseTextTooltip
            :label="formatDate(unref(startDate)! + unref(duration)!).formattedDateLabel"
            :hint="formatDate(unref(startDate)! + unref(duration)!).formattedDateFull"
            position="top"
            class="flex justify-end"
          />
          <p>{{ roundType }}</p>
          <BaseTextTooltip
            label="August 1, 2023"
            hint="August 1, 2023, 00:00:00 UTC"
            position="top"
          />
          <p>{{ BigNumber.from(roundInfo[1]).formatString(4, 3, undefined, false) }}$</p>
        </div>
      </div>
    </BaseCard>
    <BaseCard
      v-else
      class="!rounded-12px h-168px w-ful p-36px mt-10 flex items-center gap-9"
    >
      <div class="gap-25px text-12px flex">
        <div class="flex flex-col gap-6 text-right text-white text-opacity-60">
          <p class="h-12px flex items-center justify-end">
            <BaseTooltip position="left" :hint="hint" class="" />
            <span class="ml-3 text-right">TGE date</span>
          </p>
          <p>Presale start date</p>
          <p>Presale end date</p>
        </div>
        <div class="flex flex-col gap-6 text-left text-white">
          <BaseTextTooltip
            label="August 1, 2023"
            hint="August 1, 2023, 00:00:00 UTC"
            position="top"
          />
          <BaseTextTooltip
            :label="formatDate(unref(startDate)!).formattedDateLabel"
            :hint="formatDate(unref(startDate)!).formattedDateFull"
            position="top"
          />
          <BaseTextTooltip
            :label="formatDate(unref(startDate)! + unref(duration)!).formattedDateLabel"
            :hint="formatDate(unref(startDate)! + unref(duration)!).formattedDateFull"
            position="top"
          />
        </div>
      </div>
      <div class="h-108px border-r border-[#03e287]"></div>
      <div class="gap-25px text-12px flex">
        <div class="flex flex-col gap-6 text-right text-white text-opacity-60">
          <p>Investment round</p>
          <p>Date of the nearest unlock</p>
          <p>{{ kweSymbol }} token price</p>
        </div>
        <div class="flex flex-col gap-6 text-left text-white">
          <p>{{ roundType }}</p>
          <BaseTextTooltip
            label="August 1, 2023"
            hint="August 1, 2023, 00:00:00 UTC"
            position="top"
          />
          <p>{{ BigNumber.from(roundInfo[1]).formatString(4, 3, undefined, false) }}$</p>
        </div>
      </div>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
import { useMedia } from '~/utils/hooks'
import { useReadPresaleInfo } from '@/contracts/Presale'
import { formatDate } from '@/utils/hooks'
import { BigNumber } from 'ethers/lib/ethers'
import { useReadKweTokenSymbol } from '~/contracts/Token'

export interface InfoSectionProps {
  round: 0 | 1 | 2
}
const props = defineProps<InfoSectionProps>()

const roundType = computed(() => {
  if (props.round == 0) return 'Seed'
  if (props.round == 1) return 'Private'
  if (props.round == 2) return 'Public'
})

const { roundInfo, duration, startDate } = useReadPresaleInfo(props.round)

const { data: kweSymbol } = useReadKweTokenSymbol()
const { sm } = useMedia()

const hint =
  'Token Generation Event (TGE) is a moment when a company makes its tokens publicly available for purchasing. Vesting starts this day.'
</script>

<style scoped>
h2 {
  font-family: 'FONTSPRING DEMO - Nekst';
}
</style>
