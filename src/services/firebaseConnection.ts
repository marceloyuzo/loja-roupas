import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQlxbES4sV5y_KuT9tNiiKl1mWKxbGGJE",
  authDomain: "lojaroupas-543ef.firebaseapp.com",
  projectId: "lojaroupas-543ef",
  storageBucket: "lojaroupas-543ef.appspot.com",
  messagingSenderId: "700765767460",
  appId: "1:700765767460:web:ecaa63d4d85545f7e395b1",
  measurementId: "G-F66E023KBG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }