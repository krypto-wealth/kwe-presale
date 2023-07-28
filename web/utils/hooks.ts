import { computed } from 'vue'

import { useWindowSize } from '@vueuse/core'
import { useToast } from 'vue-toastification'
import { useField } from 'vee-validate'
import { useEvm } from '~/evm.config'

export type Size = 'xl' | 'lg' | 'md' | 'sm' | 'xs'

export const useMedia = (breakpoints?: { sm?: number; md?: number; lg?: number }) => {
  const smD = breakpoints?.sm ?? 640
  const mdD = breakpoints?.md ?? 768
  const lgD = breakpoints?.lg ?? 1024

  const { width } = useWindowSize()

  return {
    sm: computed(() => width.value < smD),
    md: computed(() => smD < width.value && width.value < mdD),
    lg: computed(() => mdD < width.value && width.value < lgD),
    xl: computed(() => lgD < width.value),
    currentSize: computed(() => {
      if (width.value < smD) return 'sm'
      if (smD < width.value && width.value < mdD) return 'md'
      if (mdD < width.value && width.value < lgD) return 'lg'
      if (lgD < width.value) return 'lg'
      return 'xl'
    }),
  }
}

export const useBreakpoint = (breakpoint: number) => {
  const { width } = useWindowSize()

  return width.value < breakpoint
}

export const useExtendedWidnowScroll = () => {
  const windowEl = ref<Window | null>(null)
  onMounted(() => {
    windowEl.value = window
    console.log(windowEl.value)
  })

  return useScroll(windowEl)
}

export const useWrongNetwork = () => {
  const {
    wallet: { useWallet },
    events: { useEvents },
  } = useEvm()
  const wallet = useWallet()
  const toast = useToast()

  const notifyIfWrongNetwork = () => {
    if (!wallet.state.realChainId?.includes(wallet.state.DEFAULT_CHAINID)) {
      toast.error('Please connect to the correct network.', {
        timeout: 2000,
      })
    }
  }

  useEvents().addListener('onWalletChange', () => notifyIfWrongNetwork())
  useEvents().addListener('onChainChange', () => notifyIfWrongNetwork())
  useEvents().addListener('login', () => notifyIfWrongNetwork())
}

export const useBindRef = <T>(source: Ref<T>) => {
  const target = ref<T>()
  watch(source, (val) => (target.value = val))
  return target
}

export const useBindField = <T>(
  source: Ref<T>,
  ...veeArgs: Parameters<typeof useField<T>>
) => {
  const field = useField<T>(...veeArgs)
  watch(source, (val) => field.setValue(val))
  onMounted(() => field.setValue(source.value))
  return field
}

export function formatDate(timestamp: number) {
  const options1 = { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }
  const options2 = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'UTC',
  }

  const date = new Date(timestamp * 1000)

  const formattedDateLabel = date.toLocaleDateString(
    'en-US',
    options1 as Intl.DateTimeFormatOptions
  )
  const formattedDateFull =
    date
      .toLocaleDateString('en-US', options2 as Intl.DateTimeFormatOptions)
      .replace(/(at)/, '') + ' UTC'

  return { formattedDateLabel, formattedDateFull }
}

export function formatNumber(number: string | number) {
  const parts = number.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return parts.join('.')
}
