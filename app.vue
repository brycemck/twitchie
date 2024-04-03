<script setup>
import { useNuxtApp } from 'nuxt/app';
import { useStreamChat } from '../composables/useStreamChat.js'
import MenuDrawer from '../components/MenuDrawer.vue'
import { onMounted } from 'vue';
import { usePreferencesStore } from './stores/preferences.js';
const authStore = useAuthStore()
const preferencesStore = usePreferencesStore()
const { bot, broadcaster } = storeToRefs(authStore)

const nuxtApp = useNuxtApp()
const streamChat = useStreamChat();
if (!nuxtApp.$Chat) {
  nuxtApp.provide('Chat', streamChat)
}
if (!nuxtApp.$Preferences) {
  nuxtApp.provide('Preferences', preferencesStore)
}

onMounted(() => {
  if (bot.value.accessToken !== '') {
    streamChat.initSocket(bot.value.accessToken)
  }
  preferencesStore.loadPreferencesFromDb()
})
</script>
<template>
  <v-layout class="rounded rounded-md">
    <MenuDrawer></MenuDrawer>
    <v-app-bar title="celery"></v-app-bar>
    <v-main class="d-flex" style="min-height: 300px;">
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-layout>
</template>

<style>
a {
  color: white;
  text-decoration: none;
}
</style>