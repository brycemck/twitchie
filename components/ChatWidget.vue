<script setup>
const nuxtApp = useNuxtApp();
const streamChat = nuxtApp.$Chat;
const chatMessages = ref([])
chatMessages.value = streamChat.displayedChatMessages.value
</script>
<template>
  <v-row>
    <v-col>
      <v-card title="Stream chat">
        <div class="chatbox">
          <v-card-text>
            <div v-for="message in chatMessages" :key="message.id">
              <p>
                <span v-if="message.badges" class="badges">
                  <span v-for="(i, badge) in message.badges" :key="badge" class="badge" :class="badge+'-badge'"></span>
                </span>
                <strong :style="{color: message.display_color}">{{ message.display_name }}</strong>
                &nbsp;
                <span>{{ message.message }}</span>
              </p>
            </div>
          </v-card-text>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.badges {
  display: inline-block;
  height: 16px;
}
.badge {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 3px;
  top: 3px;
  background-repeat: no-repeat;
  background-size: cover;
}
.badge:last-child {
  margin-right: 5px;
}
.artist-badge {
  background-image: url(/assets/chatbadges/artist.png);
}
.broadcaster-badge {
  background-image: url(/assets/chatbadges/broadcaster.png);
}
.moderator-badge {
  background-image: url(/assets/chatbadges/moderator.png);
}
.prime-badge {
  background-image: url(/assets/chatbadges/prime.png);
}
.turbo-badge {
  background-image: url(/assets/chatbadges/turbo.png);
}
.verified-badge {
  background-image: url(/assets/chatbadges/verified.png);
}
.vip-badge {
  background-image: url(/assets/chatbadges/vip.png);
}
.no_video-badge {
  background-image: url(/assets/chatbadges/no_video.png);
}
.no_audio-badge {
  background-image: url(/assets/chatbadges/no_audio.png);
}
</style>