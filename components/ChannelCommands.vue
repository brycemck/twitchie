<script setup>
import { useStreamChat } from "../composables/useStreamChat";
const chatDefaultCommands = ref([])
const chatInjectables = ref([])
const chatCustomCommands = ref([])
onMounted(() => {
  const streamChat = useStreamChat()
  chatDefaultCommands.value = streamChat.commands.value
  chatInjectables.value = streamChat.injectables
  // const chatMessages = streamChat.value.displayedChatMessages
})
</script>
<template>
  <v-row>
    <v-col>
      <v-card variant="elevated" title="Arguments">
        <v-card-text>
          You can reference command parameters, using #{x}. (x being the index of the parameter, starting at 0)<br><br>
          i.e. !so @Amouranth -> "Shoutout @#{0}!" -> "Shoutout @Amouranth!"<br><br>
          If there are no specified parameters, #{0} will always be the username of the sender.
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card variant="elevated" title="Injectables">
        <v-card-text>
          You can inject these variables into your commands using ${commandname}.
          <v-list lines="one">
            <v-list-item v-for="(value, key, i) in chatInjectables" :title="key">
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card variant="elevated" title="Default commands">
        <v-card-text>
          <span v-for="command in chatDefaultCommands">
            {{ command.triggers }}<br>
            {{ command.res }}<br><br>
          </span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>