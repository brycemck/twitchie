<script setup>
import MenuDrawer from '../components/MenuDrawer.vue'
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