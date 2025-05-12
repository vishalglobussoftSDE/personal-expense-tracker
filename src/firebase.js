// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getFirestore , doc , setDoc} from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDutpmycAzZm6W8TfT2ljxLr8pldOV7CiU",
  authDomain: "finance-app-d5a45.firebaseapp.com",
  projectId: "finance-app-d5a45",
  storageBucket: "finance-app-d5a45.firebasestorage.app",
  messagingSenderId: "346038246197",
  appId: "1:346038246197:web:a7b13902e82253d2134a7c",
  measurementId: "G-DNZ4ERFRQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
export {db , auth, provider , doc , setDoc};