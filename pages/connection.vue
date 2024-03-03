<script setup>
const authStore = useAuthStore()
const { bot, broadcaster } = storeToRefs(authStore)

let twitchAuth = {
  root: 'https://id.twitch.tv/oauth2/authorize?response_type=token',
  clientId: import.meta.env.VITE_APP_TWITCH_CLIENT_ID,
  redirectURI: 'http://localhost:3000/login',
  scopes: [
    'channel:manage:polls',
    'channel:read:polls',
    'chat:read',
    'chat:edit'
  ],
  scopesEncoded: ''
}
twitchAuth.URL = `${twitchAuth.root}&client_id=${twitchAuth.clientId}`
twitchAuth.scopes.forEach(scope => {
  twitchAuth.scopesEncoded += `${scope.replaceAll(':', '%3A')}+`
})
twitchAuth.URL += `&scope=${twitchAuth.scopesEncoded.substring(0, twitchAuth.scopesEncoded.length - 1)}`
</script>
<template>
  <!-- <v-card title="Connection to Broadcaster Twitch">
    <v-card-text v-if="broadcaster.loggedIn">
      Twitch Account: {{ broadcaster.name }}
      Access Token: {{ broadcaster.accessToken }}
    </v-card-text>
    <v-card-text v-else>
      <a :href="twitchAuth.URL + '&redirect_uri='+twitchAuth.redirectURI+'?broadcaster'">Login with Twitch</a>
    </v-card-text>
  </v-card> -->
  <v-card title="Connection to Chatbot Twitch">
    <v-card-text v-if="bot.loggedIn">
      Twitch Account: {{ bot.name }}
      Access Token: {{ bot.accessToken }}
    </v-card-text>
    <v-card-text v-else>
      <a :href="twitchAuth.URL + '&redirect_uri='+twitchAuth.redirectURI+'?bot'">Login with Twitch</a>
    </v-card-text>
  </v-card>
</template>