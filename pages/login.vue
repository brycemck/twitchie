<script setup>
  const authStore = useAuthStore()
  const route = useRoute()

  if (route.hash) {
    let accessToken = route.hash.substr(1).split('&')[0].split('=')[1]
    authStore.signin(accessToken)
  }

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
  twitchAuth.URL += `&redirect_uri=${twitchAuth.redirectURI}`
  twitchAuth.scopes.forEach(scope => {
    twitchAuth.scopesEncoded += `${scope.replaceAll(':', '%3A')}+`
  })
  twitchAuth.URL += `&scope=${twitchAuth.scopesEncoded.substring(0, twitchAuth.scopesEncoded.length - 1)}`
</script>
<template>
  <h1>login page</h1>
  <a :href="twitchAuth.URL">
    <button>Login with Twitch</button>
  </a>
</template>