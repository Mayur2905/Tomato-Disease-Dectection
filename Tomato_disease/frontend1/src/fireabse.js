// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4Y-juzfDQj7kgmtbBN_Ung0Mz3cMe6PY",
  authDomain: "tomato-disease-607c5.firebaseapp.com",
  projectId: "tomato-disease-607c5",
  storageBucket: "tomato-disease-607c5.appspot.com",
  messagingSenderId: "331131536896",
  appId: "1:331131536896:web:7841fc1dd9a4c3d632bae5",
  measurementId: "G-VT4PN1BRW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();

export { app, auth };
