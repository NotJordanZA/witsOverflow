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
  apiKey: "AIzaSyBfKkr2kXyVDvwXe2v5cqOOl9_uR10sO8s",
  authDomain: "witsoverflow-fa8a6.firebaseapp.com",
  projectId: "witsoverflow-fa8a6",
  storageBucket: "witsoverflow-fa8a6.appspot.com",
  messagingSenderId: "691728248776",
  appId: "1:691728248776:web:5cae6ae484fc6e84479afd",
  measurementId: "G-JEMG3SCZTX"
};

export {firebaseConfig}
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =  getFirestore(app);