<template>
  <section>
    <div class="w-343px md:w-559px">
      <h2
        class="text-24px md:text-28px md:(text-left, mt-0) mt-10 text-center font-semibold text-white"
      >
        Buy {{ kweSymbol }} tokens
      </h2>
      <div>
        <div
          class="text-12px relative mt-10 flex justify-start text-white md:justify-between"
          :class="!login ? 'opacity-60' : ''"
        >
          <p v-if="login" class="flex font-normal">
            <span class="opacity-60">Wallet balance</span>
            <BaseTextTooltip
              :label="balance.uiWithSymbol"
              :hint="balanceBN?.formatString(6)"
              position="top"
              class="ml-2 font-bold"
              opacity
            />
          </p>
          <p class="right-50px md:right-85px absolute bottom-0 !z-0 opacity-60">
            You will receive
          </p>
        </div>
        <div class="relative mt-3" :class="!login ? 'opacity-60' : ''">
          <BaseInputText
            :placeholder="!sm ? 'Enter the number of tokens' : 'Enter'"
            class="w-207px md:w-385px h-64px !rounded-r-0 w-full"
            name="text"
            :max-value="balance.ui"
            v-model="inputTokens"
            :widget="`${receiveToken}`"
            :disabled="!login"
            :error-message="errorMessage"
            @input="() => console.log(+unref(inputTokens) <= +unref(totalAvailable).ui)"
          >
            <div
              class="right-10px md:right-20px top-20px absolute text-white text-opacity-60"
            >
              USDT
            </div>
          </BaseInputText>
        </div>

        <div class="mt-6 flex flex-col items-center justify-between md:flex-row">
          <div class="text-15px flex font-light text-white text-opacity-60">
            <span class="mr-1 whitespace-nowrap"> Available purchase amount: </span>
            <p class="flex text-[#30e287] opacity-100">
              <BaseTextTooltip
                position="top"
                class="whitespace-nowrap"
                :label="formatNumber(totalAvailable.ui)"
                :hint="formatNumber(totalAvailable.ui)"
              />
              <span class="ml-1 whitespace-nowrap"> {{ symbol }}</span>
            </p>
          </div>
          <BaseButton
            primary
            class="w-343px md:w-208px h-50px text-14px mt-4 md:mt-0"
            @click="() => actionProperty.action()"
            :disabled="actionProperty.isDisabled"
          >
            {{ actionProperty.label }}
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDialogs } from '@/store/dialogs'
import { useMedia, formatNumber } from '~/utils/hooks'
import { parseBNWithSymbol } from '~/utils/bn'
import {
  useReadTokenSymbol,
  useWriteApprove as useWriteTokenApprove,
  useReadTokenBalance,
  useReadTokenDecimals,
  useReadTokenBalanceBN,
} from '@/contracts/investToken'
import { useReadPresaleInfo, useWritePresaleInvest } from '@/contracts/Presale'
import { useReadKweTokenSymbol } from '~/contracts/Token'

export interface BuySectionProps {
  amount: string
  round: 0 | 1 | 2
}

const props = defineProps<BuySectionProps>()

const { sm } = useMedia()
const dialogs = useDialogs()
const { login } = useWallet()

const inputTokens = ref('')

const { data: symbol } = useReadTokenSymbol()
const { data: kweSymbol } = useReadKweTokenSymbol()
const { data: balanceBN } = useReadTokenBalanceBN()
const { data: decimals } = useReadTokenDecimals()
const { balance, allowance: allowanceUI } = useReadTokenBalance()
const { mutateAsync: approve } = useWriteTokenApprove()
const { roundInfo, roundTotalInvested } = useReadPresaleInfo(props.round)
const { mutateAsync: invest } = useWritePresaleInvest(props.round)

const totalAvailable = computed(() =>
  parseBNWithSymbol(
    unref(roundInfo)[0].sub(unref(roundTotalInvested)!),
    unref(decimals),
    unref(symbol)
  )
)

const receiveToken = computed(() => +unref(inputTokens) / (unref(roundInfo)[1] / 10000))

const actionProperty = computed(() => {
  if (!login.value)
    return {
      label: 'Connect wallet',
      action: () => dialogs.openDialog('connect', {}),
      isDisabled: false,
    }

  if (unref(inputTokens) != '' && +unref(allowanceUI).ui < +unref(inputTokens)) {
    return {
      label: 'Enable',
      action: () => {
        return dialogs.openDialog('enable', {
          title: 'Enable',
          text: 'You need to enable interaction with the service to transfer your tokens',
          btnTitle: 'Enable',
          onConfirm: () => approve(),
        })
      },
      isDisabled: false,
    }
  }
  return {
    label: 'Buy',
    action: () => {
      return dialogs.openDialog('buy', {
        title: 'Confirm',
        text: 'You are going to buy KWE tokens. Confirm the transaction in your wallet.',
        btnTitle: 'Confirm',
        onConfirm: () => invest({ amount: unref(inputTokens), round: props.round }),
      })
    },

    isDisabled: !(
      unref(inputTokens) != '' &&
      +unref(allowanceUI).ui >= +unref(inputTokens) &&
      +unref(inputTokens) <= +unref(totalAvailable).ui &&
      +unref(inputTokens) <= +unref(balance).ui &&
      !(inputTokens.value.includes('.') && inputTokens.value.split('.')[1].length >= 7) &&
      +unref(inputTokens) !== 0
    ),
  }
})

const errorMessage = computed(() => {
  try {
    const amount = inputTokens.value.toBigNumber(decimals.value)

    if (amount.lte(0) && inputTokens.value != '') {
      return 'Amount must be more than zero'
    }

    if (amount.gt(balance.value.ui.toBigNumber(decimals.value))) {
      return 'Transfer amount exceeds balance'
    }
    if (+unref(inputTokens) > +unref(totalAvailable).ui && unref(inputTokens) != '') {
      return 'Transfer amount more than available'
    }
    if (inputTokens.value.includes('.') && inputTokens.value.split('.')[1].length > 6) {
      return 'Amount must have at most 6 decimal places'
    }
  } catch (e) {
    return 'Amount must be a number'
  }
})
</script>

<style scoped>
h2 {
  font-family: 'FONTSPRING DEMO - Nekst';
}
</style>
