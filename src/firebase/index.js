// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAwOyla1XqbbZvdAOFTyWaNsq5YGN1iAhw",
  authDomain: "achieveiiitd.firebaseapp.com",
  projectId: "achieveiiitd",
  storageBucket: "achieveiiitd.appspot.com",
  messagingSenderId: "791463956386",
  appId: "1:791463956386:web:c0438494432acb8f1c2cfb",
  measurementId: "G-P4TC4E5ET1"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export { storage };
