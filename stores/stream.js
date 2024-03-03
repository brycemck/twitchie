export const useStreamStore = defineStore('streamStore', {
  state: () => ({
    broadcaster_id: '',
    broadcaster_name: '',
    game_name: '',
    tags: [],
    stream_title: ''
  }),
  actions: {
    async getStreamInfo(broadcasterId) {
      console.log('updating stream info')
      const streamApi = useStreamApi()
      const { data: info } = await streamApi.ChannelInfo(broadcasterId)
      const thisData = info._rawValue.data[0]

      this.broadcaster_id = thisData.broadcaster_id
      this.broadcaster_name = thisData.broadcaster_name
      this.game_name = thisData.game_name
      this.tags = thisData.tags
      this.stream_title = thisData.title

      return
    }
  },
  persist: true
})