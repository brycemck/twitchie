<script setup>
import { onUnmounted } from "vue";
import { useStreamChat } from "../composables/useStreamChat";
const chatMessages = ref([])
let streamChat;
onMounted(() => {
  streamChat = useStreamChat(true)
  chatMessages.value = streamChat.displayedChatMessages.value
  
  // const chatMessages = streamChat.value.displayedChatMessages
})
onUnmounted(() => {
  streamChat.killSocket()
})
</script>
<template>
  <v-layout>
    <v-card title="Stream chat">
      <div class="chatbox">
        <v-card-text>
          <div v-for="message in chatMessages" :key="message.id">
            <p>
              <strong :style="{color: message.display_color}">{{ message.display_name }}</strong>
              &nbsp;
              <span>{{ message.message }}</span>
            </p>
          </div>
        </v-card-text>
      </div>
    </v-card>
  </v-layout>
</template>