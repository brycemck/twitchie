<script setup>
import { useNuxtApp } from "nuxt/app";
import { usePreferencesStore } from "../stores/preferences";
const preferencesStore = usePreferencesStore()

const chatDefaultCommands = ref([])
const chatInjectables = ref([])
const chatCustomCommands = ref([])
const preferences = storeToRefs(preferencesStore)

const nuxtApp = useNuxtApp()
chatDefaultCommands.value = nuxtApp.$Chat.defaultCommands.value
chatCustomCommands.value = nuxtApp.$Chat.customCommands.value
chatInjectables.value = nuxtApp.$Chat.injectables

onMounted(() => {
  preferencesStore.loadPreferencesFromDb()
  // const chatMessages = streamChat.value.displayedChatMessages
})

const preferenceUpdated = (e) => {
  const preferenceName = e.srcElement.getAttribute('name')
  let preferenceValue;
  if (e.srcElement.type == 'checkbox') {
    preferenceValue = e.srcElement.checked;
  } else {
    preferenceValue = e.srcElement.value
  }
  preferencesStore.updatePreference(preferenceName, preferenceValue)
}

</script>
<template>
  <v-row>
    <v-col>
      <v-card variant="elevated" title="Preferences">
        <v-card-text>
          <!-- <v-text-field label="Command Prefix" :model-value="commandPrefix" @change="(event) => {preferenceUpdated(event)}"></v-text-field>
          <v-checkbox label="Highlight Responses" :model-value="highlightResponses"></v-checkbox> -->
          <div v-for="(value, key, i) in preferences">
            <v-text-field v-if="typeof(value.value.value) == 'string'" :label="value.value.label" :model-value="value.value.value" :name="key" @change="preferenceUpdated"></v-text-field>
            <v-checkbox v-if="typeof(value.value.value) == 'boolean'" :label="value.value.label" :model-value="value.value.value" :name="key" @change="preferenceUpdated"></v-checkbox>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <!-- <v-col>
      <v-card variant="elevated" title="Arguments">
        <v-card-text>
          You can reference command parameters, using #{x}. (x being the index of the parameter, starting at 0)<br><br>
          i.e. {{ commandPrefix }}so @Amouranth -> "Shoutout @#{0}!" -> "Shoutout @Amouranth!"<br><br>
          If there are no specified parameters, #{0} will always be the username of the sender.
        </v-card-text>
      </v-card>
    </v-col> -->
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