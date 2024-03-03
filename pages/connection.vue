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
  <v-row>
    <v-col>
      <v-card variant="elevated" title="Connection to Bot Account">
        <v-card-text v-if="bot.loggedIn">
          <strong>Twitch Account:</strong> {{ bot.name }}<br>
          <strong>Access Token:</strong> {{ bot.accessToken }}
        </v-card-text>
        <v-card-text v-else>
          <a :href="twitchAuth.URL + '&redirect_uri='+twitchAuth.redirectURI+'?bot'">Login with Twitch</a>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>