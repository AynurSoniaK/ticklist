// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMTIxO6CteiT8GWChNU2kbDfs--bNJWPk",
  authDomain: "todolist-d139d.firebaseapp.com",
  projectId: "todolist-d139d",
  storageBucket: "todolist-d139d.appspot.com",
  messagingSenderId: "1038954032604",
  appId: "1:1038954032604:web:f3f5eeee26595f007d7319"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db }; 