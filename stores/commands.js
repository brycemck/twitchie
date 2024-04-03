import { collection, getDoc, getDocs, doc, updateDoc, setDoc } from "firebase/firestore";

export const useCommandsStore = defineStore('commandsStore', {
  state: () => ({
    defaultCommands: [
      {
        triggers: ['so', 'shoutout'],
        res: 'Please show some love to @#{0}, you can follow them here! https://twitch.tv/#{0}'
      },
      {
        triggers: ['lurk'],
        res: 'See ya later, @#{0}.'
      },
      {
        triggers: ['title'],
        res: '@#{0}, the stream title is: ${streamTitle}'
      },
      {
        triggers: ['commands'],
        res: '@#{0}, the available commands in this channel are: ${allCommands}'
      },
      {
        triggers: ['game', 'category'],
        res: '@#{0}, ${streamer} is currently playing ${streamCategory}!'
      },
      {
        triggers: ['mso'],
        res: 'All of these homies deserve your love, go follow them! ${all("@%: https://twitch.tv/% || ")}'
      }
    ],
    customCommands: [

    ],
    docSchema: {
      defaultCommands: [{
        triggers: [],
        res: ''
      }],
      customCommands: [{
        triggers: [],
        res: ''
      }]
    }
  }),
  actions: {
    async initCommandsDb() {
      console.log('initing')
      const nuxtApp = useNuxtApp()
      const streamStore = useStreamStore()
      const { broadcaster_id } = storeToRefs(streamStore)

      const db = nuxtApp.$firestore
      const docRef = doc(db, 'commands', broadcaster_id.value)

      const firstTimeCommands = this.docSchema;
      firstTimeCommands.defaultCommands = this.defaultCommands

      await setDoc(docRef, firstTimeCommands)
    },
    async loadCommandsFromDb() {
      const nuxtApp = useNuxtApp()
      const streamStore = useStreamStore()
      const { broadcaster_id } = storeToRefs(streamStore)

      const db = nuxtApp.$firestore
      const docRef = doc(db, 'commands', broadcaster_id.value)
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const commands = docSnap.data();
        this.defaultCommands = commands.defaultCommands
        this.customCommands = commands.customCommands
        return
      }
    },
    async updateCommand(name, res) {
      const nuxtApp = useNuxtApp()
      const streamStore = useStreamStore()
      const { broadcaster_id } = storeToRefs(streamStore)

      const db = nuxtApp.$firestore
      const docRef = doc(db, 'commands', broadcaster_id.value)
      const docSnap = await getDoc(docRef);
      
      const newDataSchema = this.docSchema;

      if (docSnap.exists()) {
        const commands = docSnap.data();
        let thisCommandIndex;
        console.log(commands)
        if(commands.defaultCommands.find(cmd => cmd.triggers[0] === name)) {
          thisCommandIndex = commands.defaultCommands.findIndex(cmd => cmd.triggers[0] === name)
          
          this.defaultCommands[thisCommandIndex].res = res
        } else if (commands.customCommands.find(cmd => cmd.triggers[0] === name)) {
          thisCommandIndex = commands.customCommands.findIndex(cmd => cmd.triggers[0] === name)
        
          this.customCommands[thisCommandIndex].res = res
        }
        newDataSchema.defaultCommands = this.defaultCommands
        newDataSchema.customCommands = this.customCommands

        await setDoc(docRef, newDataSchema)
        return
      }
    }
  },
  persist: true
})