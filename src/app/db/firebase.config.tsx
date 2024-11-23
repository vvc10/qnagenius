// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCacjxisxVtcL-fi8NUoLuhpDfZmD1wCEw",
  authDomain: "projects-app-4c248.firebaseapp.com",
  projectId: "projects-app-4c248",
  storageBucket: "projects-app-4c248.firebasestorage.app",
  messagingSenderId: "794354607315",
  appId: "1:794354607315:web:0480b81d0edaf2c84aa026",
  measurementId: "G-KHEB6PT8PG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
