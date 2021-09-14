import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyAHDtdN1gblH0iEfLJYC7Eu61kQhSPvUPY",

  authDomain: "fir-29cfe.firebaseapp.com",

  projectId: "fir-29cfe",

  storageBucket: "fir-29cfe.appspot.com",

  messagingSenderId: "1016032488936",

  appId: "1:1016032488936:web:4669d0c19b7b88179c485d"

};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { auth };
export default db;