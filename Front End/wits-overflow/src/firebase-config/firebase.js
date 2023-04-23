// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCenUwPI7d35xGIbVtp0LNb9Ia70STYCA4",
  authDomain: "wits-overflow-cbe02.firebaseapp.com",
  projectId: "wits-overflow-cbe02",
  storageBucket: "wits-overflow-cbe02.appspot.com",
  messagingSenderId: "726807760314",
  appId: "1:726807760314:web:aed04605d2a01f8361e183",
  measurementId: "G-B1D9ST6P02"
};

export {firebaseConfig}
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =  getFirestore(app);