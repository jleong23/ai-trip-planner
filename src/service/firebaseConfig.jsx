// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAazDi9AID-mcX9bXH8mGfIsWdWbf0YVtc",
  authDomain: "ai-trip-planner-5ed51.firebaseapp.com",
  projectId: "ai-trip-planner-5ed51",
  storageBucket: "ai-trip-planner-5ed51.firebasestorage.app",
  messagingSenderId: "840539878473",
  appId: "1:840539878473:web:f017cfbc10abdde1a9fb98",
  measurementId: "G-7F90XEYMKC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);