import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBpyisbciKkj9wURaGRRYIUDoXsVdNKsI4",
  authDomain: "reviewhero-320ea.firebaseapp.com",
  projectId: "reviewhero-320ea",
  storageBucket: "reviewhero-320ea.firebasestorage.app",
  messagingSenderId: "287028959171",
  appId: "1:287028959171:web:b58fec663689c009f6cf76"
};

console.log('Initializing Firebase with config:', JSON.stringify(firebaseConfig, null, 2));
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* // Enable local emulator if in development
if (process.env.NODE_ENV === 'development') {
  console.log('Development environment detected, connecting to auth emulator...');
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
  } catch (error) {
    console.error('Error connecting to auth emulator:', error);
  }
}
*/

console.log('Firebase initialized successfully');
export { auth, db };
