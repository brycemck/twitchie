<script setup>
import { useStreamChat } from "../composables/useStreamChat";
const chatMessages = ref([])
onMounted(() => {
  const streamChat = useStreamChat(true)
  chatMessages.value = streamChat.displayedChatMessages.value
  
  // const chatMessages = streamChat.value.displayedChatMessages
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