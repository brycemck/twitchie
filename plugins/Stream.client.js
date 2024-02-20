export default defineNuxtPlugin(async nuxtApp => {
  const authStore = useAuthStore()
  const { accessToken, loggedIn } = storeToRefs(authStore)

  let Stream = {
    streamCategory: '',
    streamTitle: '',
    streamBroadcaster: '',
    streamBroadcasterId: '',
    streamTags: []
  }

  const { data, pending, error, refresh } = await useFetch('https://api.twitch.tv/helix/channels', {
    query: { broadcaster_id: '545816188' },
    headers: {
      "Authorization": `Bearer ${accessToken.value}`,
      "Client-Id": `${import.meta.env.VITE_APP_TWITCH_CLIENT_ID}`
    },
    onResponse({ request, response, options }) {
      console.log(response)
      Stream.streamCategory = response._data.game_name
      Stream.streamTitle = response._data.streamTitle
      Stream.streamBroadcaster = response._data.broadcaster_name
      Stream.streamBroadcasterId = response._data.broadcaster_id
      Stream.streamTags = response._data.tags
    }
  })

  return {
    provide: {
      Stream: Stream
    }
  }
});