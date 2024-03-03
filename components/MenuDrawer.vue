<script setup>
  const authStore = useAuthStore()
  const { broadcaster } = storeToRefs(authStore)
  const profile_image = broadcaster.value.profile_image_url
  const broadcasterName = broadcaster.value.name
  const broadcasterLoggedIn = broadcaster.value.loggedIn
  
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
  <v-navigation-drawer
    permanent
  >
    <v-list>      
      <a v-if="!broadcasterLoggedIn"
        :href="twitchAuth.URL + '&redirect_uri='+twitchAuth.redirectURI+'?broadcaster'">
        <v-list-item
          prepend-icon="mdi-login"
          title="Sign in with Twitch"
        ></v-list-item>
      </a>
      <v-list-item
        :prepend-avatar="profile_image"
        :title="broadcasterName"
        v-else
      >
        <NuxtLink to="/signout"><v-list-item-subtitle>Sign out</v-list-item-subtitle></NuxtLink>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-account-box-multiple" title="Twitch Connection" value="connection" to="/connection"></v-list-item>
      <v-list-item prepend-icon="mdi-monitor-dashboard" title="Dashboard" value="dashboard" to="/"></v-list-item>
      <v-list-item prepend-icon="mdi-notebook" title="Commands" value="commands" to="/commands"></v-list-item>
      <v-list-item prepend-icon="mdi-message-outline" title="Chat" value="chat" to="/chat"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>