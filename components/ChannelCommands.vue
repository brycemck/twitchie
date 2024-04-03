<script setup>
import { useNuxtApp } from "nuxt/app";
import { usePreferencesStore } from "../stores/preferences";
import { useCommandsStore } from "../stores/commands";
const preferencesStore = usePreferencesStore()
const preferences = storeToRefs(preferencesStore)
const commandsStore = useCommandsStore()
const { defaultCommands, customCommands } = storeToRefs(commandsStore)

const chatInjectables = ref([])

const nuxtApp = useNuxtApp()
// chatDefaultCommands.value = nuxtApp.$Chat.defaultCommands.value
// chatCustomCommands.value = nuxtApp.$Chat.customCommands.value
chatInjectables.value = nuxtApp.$Chat.injectables

onMounted(() => {
  preferencesStore.loadPreferencesFromDb()
  commandsStore.loadCommandsFromDb()
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
const commandUpdated = (e) => {
  const commandName = e.srcElement.getAttribute('name')
  const commandRes = e.srcElement.value
  commandsStore.updateCommand(commandName, commandRes)
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
            <v-text-field density="compact" v-if="typeof(value.value.value) == 'string'" :label="value.value.label" :model-value="value.value.value" :name="key" @change="preferenceUpdated" :hint="value.value.hint" persistent-hint></v-text-field>
            <v-checkbox v-if="typeof(value.value.value) == 'boolean'" :label="value.value.label" :model-value="value.value.value" :name="key" @change="preferenceUpdated" :hint="value.value.hint" persistent-hint></v-checkbox>
            <v-divider style="margin-top:12px;"></v-divider>
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
          <span v-for="command in defaultCommands">
            <!-- {{ command.triggers }}<br>
            {{ command.res }}<br><br> -->
            <h3>{{ command.triggers[0] }}</h3>
            <v-text-field density="compact" :model-value="command.res" :name="command.triggers[0]" @change="commandUpdated"></v-text-field>
          </span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card variant="elevated" title="Custom commands">
        <v-card-text>
          <span v-for="command in customCommands">
            {{ command.triggers }}<br>
            {{ command.res }}<br><br>
          </span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>