import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB1YpgowiuFdlzPfWXCb47rCdvExe8knfI',
  authDomain: 'meupdi.firebaseapp.com',
  projectId: 'meupdi',
  storageBucket: 'meupdi.firebasestorage.app',
  messagingSenderId: '515075674258',
  appId: '1:515075674258:web:cfbe1eddbbbc59fec9564b',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
