import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "techhatti-d623a.firebaseapp.com",
  projectId: "techhatti-d623a",
  storageBucket: "techhatti-d623a.appspot.com",
  messagingSenderId: "40581333274",
  appId: "1:40581333274:web:63186d6fc3d8a820c56ca3",
  measurementId: "G-N5RE8ZR70Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);