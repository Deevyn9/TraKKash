// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtApbQJhI92_4ktixCiZ9dNs9ehevPSJE",
  authDomain: "trakkashh.firebaseapp.com",
  projectId: "trakkashh",
  storageBucket: "trakkashh.appspot.com",
  messagingSenderId: "58466565910",
  appId: "1:58466565910:web:5e06f8c49edb55f92d9a37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db}