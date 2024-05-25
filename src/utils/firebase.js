// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "flickfuse-1abca.firebaseapp.com",
  projectId: "flickfuse-1abca",
  storageBucket: "flickfuse-1abca.appspot.com",
  messagingSenderId: "440612446081",
  appId: "1:440612446081:web:e754d9e4b30026669a9280",
  measurementId: "G-NJTMG82R26",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
