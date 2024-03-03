<script setup>
  const authStore = useAuthStore()
  const { broadcaster } = storeToRefs(authStore);
  const route = useRoute()

  if (route.hash) {
    if (route.query.hasOwnProperty('bot')) {
      let accessToken = route.hash.substr(1).split('&')[0].split('=')[1]
      authStore.signinBot(accessToken)
    }
    if (route.query.hasOwnProperty('broadcaster')) {
      if (!broadcaster.value.loggedIn) {
        console.log('not logged in, grabbing hash info')
        let accessToken = route.hash.substr(1).split('&')[0].split('=')[1]
        authStore.signinBroadcaster(accessToken)
      } else {
        console.log('already logged in, refreshing data')
        let accessToken = broadcaster.value.accessToken;
        console.log(broadcaster.value)
        authStore.signinBroadcaster(accessToken)
      }
    }
  }
</script>
<template>
  <h1>login page</h1>
</template>