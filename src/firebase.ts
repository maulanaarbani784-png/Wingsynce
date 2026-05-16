import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxA8eCmengmMTOJ2vdekcwrkcitwJEjOI",
  authDomain: "wingsynce.firebaseapp.com",
  projectId: "wingsynce",
  storageBucket: "wingsynce.firebasestorage.app",
  messagingSenderId: "264750582635",
  appId: "1:264750582635:web:b1a74496e7e07813211a2e",
  measurementId: "G-FS5X8JM2VY"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
