import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBHaQ_hLEvTAcYAG3K3iqQ9WJXtE0Zf_L0",
  authDomain: "fir-app-1f936.firebaseapp.com",
  projectId: "fir-app-1f936",
  storageBucket: "fir-app-1f936.appspot.com",
  messagingSenderId: "105392588970",
  appId: "1:105392588970:web:169238bf82d51a899ae8d3",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIRESTORE_APP);
