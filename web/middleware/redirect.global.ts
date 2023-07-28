export default defineNuxtRouteMiddleware((to, from) => {
  console.log(from.path, to.path)
  // if (to.path === '/') {
  //   return navigateTo('/public')
  // }
})
