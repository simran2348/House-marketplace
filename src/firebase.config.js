import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDNGlqc5Ixi3NPH5QBA-Z6_qe1XE0MVyZI',
  authDomain: 'house-marketplace-1997.firebaseapp.com',
  projectId: 'house-marketplace-1997',
  storageBucket: 'house-marketplace-1997.appspot.com',
  messagingSenderId: '83529908097',
  appId: '1:83529908097:web:d48dbe8957fe3a19ba3280'
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
