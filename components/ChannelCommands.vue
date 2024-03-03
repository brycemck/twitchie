<script setup>
import { useStreamChat } from "../composables/useStreamChat";
const chatDefaultCommands = ref([])
const chatCustomCommands = ref([])
onMounted(() => {
  const streamChat = useStreamChat()
  chatDefaultCommands.value = streamChat.commands.value
  
  // const chatMessages = streamChat.value.displayedChatMessages
})
</script>
<template>
  <v-card title="Default commands">
    <v-card-text>
      <span v-for="command in chatDefaultCommands">
        {{ command.triggers }}<br>
        {{ command.res }}<br><br>
      </span>
    </v-card-text>
  </v-card>
  <v-card-text>
    
  </v-card-text>
</template>