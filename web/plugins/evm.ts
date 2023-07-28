import { Pinia, createPinia, getActivePinia } from 'pinia'
import { setActivePinia } from '@gotbit/evm-vue3'

import { useEvm } from '@/evm.config'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    let pinia: Pinia | undefined
    try {
      pinia = getActivePinia()
    } catch (error) {
      pinia = createPinia()
    }
    setActivePinia(pinia)
    useEvm().init()
  })
})
