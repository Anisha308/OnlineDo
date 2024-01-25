import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC62kq07cDZEvnXR2iMSAIBHUDlO2HqsNs",
  authDomain: "online-do.firebaseapp.com",
  projectId: "online-do",
  storageBucket: "online-do.appspot.com",
  messagingSenderId: "779431502955",
  appId: "1:779431502955:web:666c42bd646ef674853d2e",
  measurementId: "G-80GVKHRD16",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
