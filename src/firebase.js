// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjJydgCLhyKC4s6n9VVg9eWNhp7KN4m2c",
  authDomain: "trello-abhi.firebaseapp.com",
  projectId: "trello-abhi",
  storageBucket: "trello-abhi.appspot.com",
  messagingSenderId: "640878524145",
  appId: "1:640878524145:web:53e20658d590bab12e5b50",
  measurementId: "G-H2HY3Z4BJ3",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { firebaseApp, auth };
