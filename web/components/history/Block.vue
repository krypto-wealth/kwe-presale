<template>
  <div class="flex justify-center">
    <BaseCard
      v-if="!sm"
      class="!py-28px rounded-12px text-12px flex w-full items-center justify-between px-0 text-center text-white"
    >
      <p class="w-[16%]">
        <span class="inline-block w-[122px]">
          {{ formatDate(buyDateTimestamp).formattedDateFull.slice(0, -18) }}
        </span>
        <span class="inline-block w-[122px]">
          {{ formatDate(buyDateTimestamp).formattedDateFull.slice(-18) }}
        </span>
      </p>
      <p class="w-[15%]">{{ roundType }}</p>
      <p class="w-[16%]">${{ unref(tokenEqualUSD).toFixed(3) }}</p>
      <div class="w-[20%]">
        <div class="leading-15px inline-block w-[122px]">
          <p>Tue, August 1,</p>
          <p>2023 00:00:00 UTC</p>
        </div>
      </div>
      <p class="flex w-[15%] items-center justify-center">
        <BaseTextTooltip
          class=""
          position="top"
          :hint="props.data[2].toNumber() / 10 ** decimals!"
          :label="(props.data[2].toNumber() / 10 ** decimals!) % 0 === 1 ? (props.data[2].toNumber() / 10 ** decimals!).toFixed(2): props.data[2].toNumber() / 10 ** decimals! "
        />
        <span class="ml-1 whitespace-nowrap">{{ symbol }}</span>
      </p>
      <div class="w-[16%]">
        <p class="flex justify-center">
          <BaseTextTooltip
            class="rounded-4px bg-[#083731] p-2"
            position="top"
            :hint="tokenReceive"
            :label="
              tokenReceive % 1 === 0
                ? tokenReceive + ` KWE`
                : tokenReceive.toFixed(2) + ` KWE`
            "
          />
        </p>
      </div>
    </BaseCard>
    <BaseCard v-else class="w-343px rounded-12px flex flex-col p-6">
      <div class="flex">
        <div class="text-12px w-125px text-white">
          <p class="text-white text-opacity-60">Purchase date</p>
          <p class="leading-16px mt-3 flex flex-col">
            <span class="inline-block w-[122px]">
              {{ formatDate(buyDateTimestamp).formattedDateFull.slice(0, -18) }}
            </span>
            <span class="inline-block w-[122px]">
              {{ formatDate(buyDateTimestamp).formattedDateFull.slice(-18) }}
            </span>
          </p>
        </div>
        <div class="text-12px ml-18px text-white">
          <p class="text-white text-opacity-60">Round</p>
          <p class="mt-3 flex flex-col">{{ roundType }}</p>
        </div>
      </div>
      <div class="mt-6 flex">
        <div class="text-12px w-125px text-white">
          <p class="text-white text-opacity-60">{{ 'KWE' }} token price</p>
          <p class="leading-16px mt-3 flex flex-col">
            {{ BigNumber.from(roundInfo[1]).formatString(4, 3, undefined, false) }}$
          </p>
        </div>
        <div class="text-12px ml-18px text-white">
          <p class="text-white text-opacity-60">Date of the nearest unlock</p>
          <p class="leading-16px mt-3 flex flex-col">
            <span>Tue, August 1, 2023 ,</span><span>2023 at 00:00:00 UTC</span>
          </p>
        </div>
      </div>
      <div class="mt-6 flex">
        <div class="text-12px w-125px text-white">
          <p class="text-white text-opacity-60">Principal</p>
          <p class="leading-16px mt-3 flex flex-row">
            <BaseTextTooltip
              position="top"
              :hint=" props.data[2].toNumber() / 10 ** decimals! "
              :label="
                props.data[2].toNumber() / 10 ** decimals! 
              "
            />
            <span class="ml-1">{{ symbol }}</span>
          </p>
        </div>
        <div class="text-12px ml-18px text-white">
          <p class="text-white text-opacity-60">You will receive</p>
          <div class="mt-6px">
            <p class="flex justify-start">
              <BaseTextTooltip
                class="rounded-4px bg-[#083731] p-2"
                position="top"
                :hint="tokenReceive"
                :label="
                  tokenReceive % 1 === 0
                    ? tokenReceive + ` ${kweSymbol}`
                    : tokenReceive.toFixed(2) + ` ${kweSymbol}`
                "
              />
            </p>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { useMedia, formatDate } from '~/utils/hooks'
import { useReadTokenSymbol, useReadTokenDecimals } from '@/contracts/investToken'
import { useReadPresaleInfo } from '@/contracts/Presale'
import { useReadKweTokenSymbol } from '@/contracts/Token'
import { BigNumber } from 'ethers/lib/ethers'
import { BNtoNumber } from '~/utils/bn'

export interface TableBlockProps {
  round: 0 | 1 | 2
  data: [number, number, BigNumber]
}

const props = defineProps<TableBlockProps>()

const { data: symbol } = useReadTokenSymbol()
const { data: kweSymbol } = useReadKweTokenSymbol()
const { data: decimals } = useReadTokenDecimals()
const round = computed(() => props.data[0])
const buyDateTimestamp = computed(() => props.data[1])
const { roundInfo } = useReadPresaleInfo(props.data[0])

const tokenEqualUSD = computed(() => unref(roundInfo)[1] / 10000)

const tokenReceive = computed(
  () => BNtoNumber(props.data[2], unref(decimals)).num / (unref(roundInfo)[1] / 10000)
)
const roundType = computed(() => {
  if (unref(round) == 0) return 'Seed'
  if (unref(round) == 1) return 'Private'
  if (unref(round) == 2) return 'Public'
})

const { sm } = useMedia()
</script>

<style scoped></style>
