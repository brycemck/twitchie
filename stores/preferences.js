import { collection, getDoc, getDocs, doc, updateDoc } from "firebase/firestore";

export const usePreferencesStore = defineStore('preferencesStore', {
  state: () => ({
    commandPrefix: {
      label: 'Command Prefix',
      value: '!'
    },
    highlightResponses: {
      label: 'Highlight bot responses',
      value: true
    }
  }),
  actions: {
    async loadPreferencesFromDb() {
      const nuxtApp = useNuxtApp()
      const streamStore = useStreamStore()
      const { broadcaster_id } = storeToRefs(streamStore)

      const db = nuxtApp.$firestore
      const docRef = doc(db, 'preferences', broadcaster_id.value)
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const preferences = docSnap.data();
        this.commandPrefix.value = preferences.commandPrefix;
        this.highlightResponses.value = preferences.highlightResponses;
      }
    },
    async updatePreference(preference, value) {
      const nuxtApp = useNuxtApp()
      const streamStore = useStreamStore()
      const { broadcaster_id } = storeToRefs(streamStore)
      
      const db = nuxtApp.$firestore
      const docRef = doc(db, 'preferences', broadcaster_id.value)

      await updateDoc(docRef, {
        [preference]: value
      })
    }
  }
})