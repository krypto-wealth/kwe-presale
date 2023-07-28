import { defineStore } from 'pinia'
import dialogs from '@/components/dialogs'

export type DialogName = keyof typeof dialogs
type DialogProps = InstanceType<(typeof dialogs)[DialogName]>['$props']

export interface Dialog {
  name: string
  props: object
  params?: Params
}
export type Params = Partial<{
  notClosable: boolean
  noCross: boolean
}>

export const useDialogs = defineStore('dialogs', {
  state: () => {
    return {
      currentDialog: null as Dialog | null,
      show: false,
    }
  },
  actions: {
    async openDialog<N extends DialogName>(name: N, props: DialogProps, params?: Params) {
      const dialog: Dialog = {
        name,
        props,
        params,
      }
      this.show = true
      this.currentDialog = dialog
    },
    async closeCurrentDialog() {
      if (this.currentDialog?.params?.notClosable) return

      this.show = false
      setTimeout(() => (this.currentDialog = null), 500)
    },
  },
})
