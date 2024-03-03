<script setup>
  const streamStore = useStreamStore()
  const { broadcaster_id, stream_title, game_name, tags, broadcaster_name } = storeToRefs(streamStore)
</script>
<template>
  <v-card title="Current Channel Information">
    <v-card-text>
      <p>stream title: {{ stream_title }}</p>
      <p>stream broadcaster name: {{ broadcaster_name }}</p>
      <p>stream category: {{ game_name }}</p>
      <p>stream tags: {{ tags }}</p>
    </v-card-text>
  </v-card>
  <v-card title="Channel Stats">
    <v-card-text>
      some other channel info
    </v-card-text>
  </v-card>
</template>