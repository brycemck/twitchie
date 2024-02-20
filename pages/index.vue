<script setup>
import ChatWidget from '../components/ChatWidget.vue'

definePageMeta({
  middleware: [
    'auth'  
  ]
})
</script>

<template>
  <ChatWidget />
</template>