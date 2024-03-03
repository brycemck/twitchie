<script setup>
  const streamStore = useStreamStore()
  const { broadcaster_id, stream_title, game_name, tags, broadcaster_name } = storeToRefs(streamStore)
  streamStore.getStreamInfo(broadcaster_id)
</script>
<template>
  <v-row>
    <v-col>
      <v-card variant="elevated" title="Current Channel Information">
        <v-card-text>
          <p>stream title: {{ stream_title }}</p>
          <p>stream broadcaster name: {{ broadcaster_name }}</p>
          <p>stream category: {{ game_name }}</p>
          <p>stream tags: {{ tags }}</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card variant="elevated" title="Channel Stats">
        <v-card-text>
          some other channel info
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>