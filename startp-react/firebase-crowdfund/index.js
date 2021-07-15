import firebase from 'firebase';
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmds6uELgPyIQErl-R6LeZjzywaliDmtw",
  authDomain: "blockboosted-357c8.firebaseapp.com",
  projectId: "blockboosted-357c8",
  storageBucket: "blockboosted-357c8.appspot.com",
  messagingSenderId: "687439735221",
  appId: "1:687439735221:web:8c69fc42ef959d0fe011fc",
  measurementId: "G-E3850LFWP2"
};
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }else {
      firebase.app(); // if already initialized, use that one
  }
  let storage = firebase.storage()
  let db = firebase.firestore()
  export { db, storage, firebase as default }