import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { defineNuxtPlugin } from 'nuxt/app'


export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
  }
  
  if (!getApps().length) {
    const firebaseApp = initializeApp(firebaseConfig)
    const firestore = getFirestore(firebaseApp);
    return {
      provide: {
        firestore
      }
    }
  }
})
