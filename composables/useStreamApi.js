import { useFetch } from "nuxt/app";
export const useStreamApi = () => {
  return {
    ChannelInfo(broadcasterId) {
      const authStore = useAuthStore()
      const { broadcaster } = storeToRefs(authStore)
      return useFetch('https://api.twitch.tv/helix/channels', {
        query: { broadcaster_id: broadcasterId },
        headers: {
          "Authorization": `Bearer ${broadcaster.value.accessToken}`,
          "Client-Id": `${import.meta.env.VITE_APP_TWITCH_CLIENT_ID}`
        }
      })
    },
    UserInfo(token, loginName) {
      return $fetch('https://api.twitch.tv/helix/users', {
        query: { login: loginName },
        headers: {
          "Authorization": `Bearer ${token}`,
          "Client-Id": `${import.meta.env.VITE_APP_TWITCH_CLIENT_ID}`
        }
      })
    }
  }
}