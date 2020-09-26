import * as firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAMsTLC6mSFZ-_CNVy_k80kAsCgkGsRBm0",
  authDomain: "dropdownux.firebaseapp.com",
  databaseURL: "https://dropdownux.firebaseio.com",
  projectId: "dropdownux",
  storageBucket: "dropdownux.appspot.com",
  messagingSenderId: "634735206698",
  appId: "1:634735206698:web:4fbaa0b305cd1a845cbe53",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const firestoreDatabase = firebase.firestore(app);
