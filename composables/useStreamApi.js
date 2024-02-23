import { useFetch } from "nuxt/app";

export const useStreamApi = () => {
  const authStore = useAuthStore();
  const { accessToken } = storeToRefs(authStore);

  return {
    ChannelInfo(broadcasterId) { 
      return useFetch('https://api.twitch.tv/helix/channels', {
        query: { broadcaster_id: broadcasterId },
        headers: {
          "Authorization": `Bearer ${accessToken.value}`,
          "Client-Id": `${import.meta.env.VITE_APP_TWITCH_CLIENT_ID}`
        }
      })
    },
    UserInfo(loginName) {
      return useFetch('https://api.twitch.tv/helix/users', {
        query: { login: loginName },
        headers: {
          "Authorization": `Bearer ${accessToken.value}`,
          "Client-Id": `${import.meta.env.VITE_APP_TWITCH_CLIENT_ID}`
        }
      })
    }
  }
}