<script setup>
  const authStore = useAuthStore()
  const streamStore = useStreamStore()
</script>
<template>
  <v-navigation-drawer
    expand-on-hover
    rail
  >
    <v-list>
      <v-list-item
        :prepend-avatar="streamStore.profile_image_url"
        :title="streamStore.broadcaster_name"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-monitor-dashboard" title="Dashboard" value="dashboard" to="/"></v-list-item>
      <v-list-item prepend-icon="mdi-notebook" title="Commands" value="commands" to="/commands"></v-list-item>
      <v-list-item prepend-icon="mdi-message-outline" title="Chat" value="chat" to="/chat"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>