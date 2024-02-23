export const useStreamApi = () => {
  const authStore = useAuthStore();
  const { accessToken } = storeToRefs(authStore);

  return {
    ChannelInfo() { 
      return useFetch('https://api.twitch.tv/helix/channels', {
        query: { broadcaster_id: '545816188' },
        headers: {
          "Authorization": `Bearer ${accessToken.value}`,
          "Client-Id": `${import.meta.env.VITE_APP_TWITCH_CLIENT_ID}`
        }
      })
    }
  }
}