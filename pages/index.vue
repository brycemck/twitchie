<script setup>
import MenuDrawer from '../components/MenuDrawer.vue'
import Dashboard from '../components/Dashboard.vue'

const streamStore = useStreamStore()
streamStore.getStreamInfo(streamStore.broadcaster_id)

definePageMeta({
  // middleware: [
  //   'auth'  
  // ]
})
</script>

<template>
  <Dashboard></Dashboard>
</template>
