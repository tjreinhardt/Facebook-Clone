import firebase from "./firebase"
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCUEnuDmxDKtc_DsU1OQtV1mK4v0zFyw4E",
  authDomain: "fbclone-e1538.firebaseapp.com",
  projectId: "fbclone-e1538",
  storageBucket: "fbclone-e1538.appspot.com",
  messagingSenderId: "859042618027",
  appId: "1:859042618027:web:7b8477f1b265389e19b5ee",
  measurementId: "G-L83PDL2TWJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
