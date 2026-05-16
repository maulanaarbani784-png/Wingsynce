import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyssRn43XQL3jIJrLm18iW6qn6x_CxmV8",
  authDomain: "vip1-660e2.firebaseapp.com",
  databaseURL: "https://vip1-660e2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vip1-660e2",
  storageBucket: "vip1-660e2.firebasestorage.app",
  messagingSenderId: "973855126322",
  appId: "1:973855126322:web:8fa5c7f32960cc900d9d2b",
  measurementId: "G-TE3BL7RXSM"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
