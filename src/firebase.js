import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjJydgCLhyKC4s6n9VVg9eWNhp7KN4m2c",
  authDomain: "trello-abhi.firebaseapp.com",
  projectId: "trello-abhi",
  storageBucket: "trello-abhi.appspot.com",
  messagingSenderId: "640878524145",
  appId: "1:640878524145:web:53e20658d590bab12e5b50",
  measurementId: "G-H2HY3Z4BJ3",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db };
