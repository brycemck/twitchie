<script setup>
import ChatWidget from '../components/ChatWidget.vue'

const streamStore = useStreamStore()
streamStore.getStreamInfo(streamStore.broadcaster_id)

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
    <p>stream category: {{ streamStore.game_name }}</p>
    <p>stream tags: {{ streamStore.tags }}</p>
  </div>
</template>