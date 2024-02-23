<script setup>
import ChatWidget from '../components/ChatWidget.vue'

const streamStore = useStreamStore()
streamStore.getStreamInfo()

definePageMeta({
  middleware: [
    'auth'  
  ]
})
</script>

<template>
  <ChatWidget />
  <div>
    <h2>stream info</h2>
    <p>stream title: {{ streamStore.stream_title }}</p>
    <p>stream broadcaster name: {{ streamStore.broadcaster_name }}</p>
  </div>
</template>