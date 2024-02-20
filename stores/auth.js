export const useAuthStore = defineStore('authStore', {
  state: () => ({
    displayName: '',
    accessToken: '',
    loggedIn: false
  }),
  actions: {
    signin(token) {
      this.accessToken = token;
      this.loggedIn = true;
      navigateTo('/')
    }
  },
  persist: true
})