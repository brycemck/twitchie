import { navigateTo } from "nuxt/app";

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    bot: {
      name: '',
      accessToken: '',
      loggedIn: false,
      profile_image_url: ''
    },
    broadcaster: {
      name: '',
      accessToken: '',
      loggedIn: false,
      profile_image_url: ''
    }
  }),
  actions: {
    async signinBot(token) {
      const streamApi = useStreamApi()
      this.bot.accessToken = token;
      this.bot.loggedIn = true;
      const { data } = await streamApi.UserInfo(token)
      this.bot.name = data[0].display_name
      this.bot.profile_image_url = data[0].profile_image_url
      return navigateTo('/connection')
    },
    async signinBroadcaster(token) {
      const streamApi = useStreamApi()
      this.broadcaster.accessToken = token;
      this.broadcaster.loggedIn = true;
      const { data } = await streamApi.UserInfo(token)
      console.log(data[0])
      this.broadcaster.name = data[0].display_name
      this.broadcaster.profile_image_url = data[0].profile_image_url
      return navigateTo('/connection')
    }
  },
  persist: true
})