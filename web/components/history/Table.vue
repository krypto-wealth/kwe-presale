<template>
  <div class="flex w-full flex-col">
    <table class="mt-12 w-full" v-if="!sm">
      <tr class="text-12px whitespace-nowrap text-white text-opacity-60">
        <th class="w-[15%]">
          <div class="flex cursor-pointer items-center justify-center" @click="sort()">
            <span>Purchase date</span>
            <IconsArrowDown v-if="sorted" class="ml-2 rotate-180" stroke="#FFFFFFCC" />
            <IconsArrowDown v-else class="ml-2" stroke="#FFFFFFCC" />
          </div>
        </th>
        <th class="w-[15%]">Round</th>
        <th class="w-[15%]">{{ kweSymbol }} token price</th>
        <th class="w-[20%]">Date of nearest unlock</th>
        <th class="w-[15%]">Principal</th>
        <th class="w-[15%]">You will receive</th>
      </tr>
    </table>
    <div class="mt-2">
      <HistoryBlock
        :round="round"
        class="mt-4"
        v-for="history of displayedHistory"
        :key="history[1]"
        :data="history"
      />
    </div>
    <p class="mr-250px text-12px mt-6 text-center text-[#03e287]" v-if="sm && login">
      Totals:
    </p>
    <BaseCard
      v-if="login"
      class="w-343px md:w-465px mt-10px flex items-center justify-between self-center px-6 py-8 md:self-end md:px-12"
    >
      <p class="flex text-white" v-if="!sm">
        <span class="text-[#03e287]"> Totals:</span>
        <BaseTextTooltip
          :label="
            totalValues.totalUSDT % 1 === 0
              ? totalValues.totalUSDT
              : totalValues.totalUSDT.toFixed(2)
          "
          :hint="totalValues.totalUSDT"
          position="top"
          class="ml-5"
        />
        <span class="ml-1"> {{ symbol }}</span>
      </p>
      <div v-else class="text-white">
        <p class="text-12px !font-normal text-white text-opacity-60">Principal</p>
        <p class="text-12px mt-3 flex">
          <BaseTextTooltip
            :label="
              totalValues.totalUSDT % 1 === 0
                ? totalValues.totalUSDT
                : totalValues.totalUSDT.toFixed(2)
            "
            :hint="totalValues.totalUSDT"
            position="top"
          />
          <span class="ml-1"> {{ symbol }}</span>
        </p>
      </div>
      <div class="mr-13 md:mr-20" v-if="sm">
        <p class="text-12px !font-normal text-white text-opacity-60">You will receive</p>
        <div class="rounded-4px text-12px mt-10px flex bg-[#03e287] px-2 py-1 font-bold">
          <BaseTextTooltip
            :label="
              totalValues.totalToken % 1 === 0
                ? totalValues.totalToken
                : totalValues.totalToken.toFixed(2)
            "
            :hint="totalValues.totalToken"
            position="top"
            hover-text="#ffffff"
          />
          <span class="ml-1">{{ kweSymbol }}</span>
        </div>
      </div>
      <div v-else>
        <div class="rounded-4px flex bg-[#03e287] p-2 !font-bold">
          <BaseTextTooltip
            :label="
              totalValues.totalToken % 1 === 0
                ? totalValues.totalToken
                : totalValues.totalToken.toFixed(2)
            "
            :hint="totalValues.totalToken"
            position="top"
            hover-text="#ffffff"
          />
          <span class="ml-1">{{ kweSymbol }}</span>
        </div>
      </div>
    </BaseCard>

    <div v-if="sm">
      <p
        class="text-15px mt-8 cursor-pointer text-center font-semibold text-[#03e287]"
        @click="itemsPerPage = userHistoryData.length"
        v-if="userHistoryData.length !== itemsPerPage"
      >
        Load More
      </p>
      <p
        class="text-15px mt-8 cursor-pointer text-center font-semibold text-[#03e287]"
        @click="itemsPerPage = 3"
        v-else
      >
        Hide
      </p>
    </div>
    <div
      v-if="!sm && login"
      class="gap-10px pagination mt-4 flex self-end text-white text-opacity-60"
    >
      <button @click="previousPage" :disabled="currentPage === 1">
        <IconsAngleLeft />
      </button>

      <span v-if="visiblePages[0] !== 1" @click="goToPage(1)">1</span>

      <span v-if="visiblePages[0] > 2">...</span>

      <span
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="{ 'text-[#03e287]': currentPage === page }"
      >
        {{ page }}
      </span>

      <span v-if="visiblePages[visiblePages.length - 1] < totalPages - 1">...</span>

      <span
        v-if="visiblePages[visiblePages.length - 1] < totalPages"
        @click="goToPage(totalPages)"
      >
        {{ totalPages }}
      </span>

      <button @click="nextPage" :disabled="currentPage === totalPages">
        <IconsAngleRight />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMedia } from '~/utils/hooks'
import { useReadTokenDecimals, useReadTokenSymbol } from '@/contracts/investToken'
import { useReadPresaleInfo, useReadTokenUserInvestmentInfo } from '@/contracts/Presale'
import { useReadKweTokenSymbol } from '~/contracts/Token'
import { BNtoNumber } from '~/utils/bn'

export interface TableProps {
  round: 0 | 1 | 2
}
const props = defineProps<TableProps>()

const { sm } = useMedia()
const { login } = useWallet()

const { data: userHistory } = useReadTokenUserInvestmentInfo()
const userHistoryData = computed(
  () => unref(userHistory)!.filter((h) => h[0] === props.round) ?? []
)
const { data: symbol } = useReadTokenSymbol()
const { data: kweSymbol } = useReadKweTokenSymbol()
const { data: decimals } = useReadTokenDecimals()

const totalValues = computed(() => {
  let totalUSDT = 0
  let totalToken = 0
  unref(userHistoryData).map((oneTx) => {
    const { roundInfo } = useReadPresaleInfo(oneTx[0])
    totalUSDT += BNtoNumber(oneTx[2], unref(decimals)).num
    totalToken +=
      BNtoNumber(oneTx[2], unref(decimals)).num / (unref(roundInfo)[1] / 10000)
  })
  return { totalUSDT, totalToken }
})

const itemsPerPage = ref(3)
const currentPage = ref(1)
const visiblePageCount = 3
const sorted = ref(false)

const totalPages = computed(() =>
  Math.ceil(unref(userHistoryData).length / itemsPerPage.value)
)
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => startIndex.value + itemsPerPage.value)

const sortedUserHistoryData = computed(() =>
  sorted.value ? [...unref(userHistoryData)].reverse() : unref(userHistoryData)
)

function sort() {
  sorted.value = !sorted.value
}

const displayedHistory = computed(() =>
  unref(sortedUserHistoryData).slice(startIndex.value, endIndex.value)
)

const visiblePages = computed(() => {
  const pages = []
  let startPage = 1
  let endPage = Math.min(visiblePageCount, totalPages.value)

  if (currentPage.value > Math.floor(visiblePageCount / 2)) {
    startPage = Math.max(currentPage.value - Math.floor(visiblePageCount / 2), 1)
    endPage = Math.min(startPage + visiblePageCount - 1, totalPages.value)
  }

  for (let page = startPage; page <= endPage; page++) {
    pages.push(page)
  }

  return pages
})

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

watch(
  () => sm.value,
  (sm) => {
    itemsPerPage.value = 3
  }
)
</script>

<style scoped>
.pagination {
  span {
    font-weight: 300;
  }
  cursor: pointer;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
~/contracts/InvestToken
