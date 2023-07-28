import DialogComponents from '@/components/dialogs'

export default defineNuxtPlugin((nuxtApp) => {
  Object.keys(DialogComponents).forEach((name) => {
    nuxtApp.vueApp.component(name, (DialogComponents as any)[name])
  })
})
