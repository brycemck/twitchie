export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const { loggedIn } = storeToRefs(authStore)
  if (!loggedIn.value) {
    console.log('not logged in, redirecting to login page')
    return navigateTo('/login')
  }
})