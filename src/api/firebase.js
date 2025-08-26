import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfI-B6MNAtLiyxejtodlkBPtDKEDVvtNY",
  authDomain: "i-q-wallet-8c9kdl.firebaseapp.com",
  projectId: "i-q-wallet-8c9kdl",
  storageBucket: "i-q-wallet-8c9kdl.firebasestorage.app",
  messagingSenderId: "307441789186",
  appId: "1:307441789186:web:bb00b92a1323105e3dba1b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log("firebase app:", app.name);
console.log("firebase auth:", auth ? "Çalışıyor" : "Hatalı");
