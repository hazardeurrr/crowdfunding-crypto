import firebase from 'firebase';
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyAxLDH4sjj2Cdtf-ylbdwAcqoQwKnViACM",
    authDomain: "crowdfunding-dev-5f802.firebaseapp.com",
    databaseURL: "https://crowdfunding-dev-5f802-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "crowdfunding-dev-5f802",
    storageBucket: "crowdfunding-dev-5f802.appspot.com",
    messagingSenderId: "410127192023",
    appId: "1:410127192023:web:e68a5eaa7a14d930190592",
    measurementId: "G-MPJJH1SDCT"
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