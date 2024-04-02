<script setup>
import { useNuxtApp } from "nuxt/app";

const chatDefaultCommands = ref([])
const chatInjectables = ref([])
const chatCustomCommands = ref([])

const nuxtApp = useNuxtApp()
chatDefaultCommands.value = nuxtApp.$Chat.defaultCommands.value
chatCustomCommands.value = nuxtApp.$Chat.customCommands.value
chatInjectables.value = nuxtApp.$Chat.injectables

onMounted(() => {
  // const chatMessages = streamChat.value.displayedChatMessages
})

</script>
<template>
  <!-- <v-row>
    <v-col>
      <v-card variant="elevated" title="Preferences">
        <v-card-text>
          <v-text-field label="Command Prefix" :model-value="commandPrefix" @update:modelValue="commandPrefixUpdate"></v-text-field>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card variant="elevated" title="Arguments">
        <v-card-text>
          You can reference command parameters, using #{x}. (x being the index of the parameter, starting at 0)<br><br>
          i.e. {{ commandPrefix }}so @Amouranth -> "Shoutout @#{0}!" -> "Shoutout @Amouranth!"<br><br>
          If there are no specified parameters, #{0} will always be the username of the sender.
        </v-card-text>
      </v-card>
    </v-col> -->
  <v-row>
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
  <v-row>
    <v-col>
      <v-card variant="elevated" title="Custom commands">
        <v-card-text>
          <span v-for="command in chatCustomCommands">
            {{ command.triggers }}<br>
            {{ command.res }}<br><br>
          </span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>