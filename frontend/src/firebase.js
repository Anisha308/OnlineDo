// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC62kq07cDZEvnXR2iMSAIBHUDlO2HqsNs",
  authDomain: "online-do.firebaseapp.com",
  projectId: "online-do",
  storageBucket: "online-do.appspot.com",
  messagingSenderId: "779431502955",
  appId: "1:779431502955:web:666c42bd646ef674853d2e",
  measurementId: "G-80GVKHRD16",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
