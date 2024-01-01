// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR1_RPfdlQLQf8WxyQeVC18Q4NzjH0fIM",
  authDomain: "tarot-sitaara.firebaseapp.com",
  projectId: "tarot-sitaara",
  storageBucket: "tarot-sitaara.appspot.com",
  messagingSenderId: "182539186488",
  appId: "1:182539186488:web:7a8995b599eca5d31251cd"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
// Initialize Firebase
