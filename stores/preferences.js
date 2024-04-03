import { collection, getDoc, getDocs, doc } from "firebase/firestore";

export const usePreferencesStore = defineStore('preferencesStore', {
  state: () => ({
    commandPrefix: '!',
    highlightResponses: true
  }),
  actions: {
    async loadPreferencesFromDb() {
      const nuxtApp = useNuxtApp();
      const db = nuxtApp.$firestore
      console.log(db)
      const docRef = doc(db, 'test', 'preferences')
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const preferences = docSnap.data();
        this.commandPrefix = preferences.commandPrefix;
        this.highlightResponses = preferences.highlightResponses;
      }
    }
  }
})