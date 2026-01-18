/* Config detail from Firebase console(project name:)JSFirebaseassignment */
//import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6JDiimBhvfrf50esNQtS108QmFfdoAZw",
  authDomain: "jsfirebaseassignment-730f0.firebaseapp.com",
  projectId: "jsfirebaseassignment-730f0",
  storageBucket: "jsfirebaseassignment-730f0.firebasestorage.app",
  messagingSenderId: "680510483192",
  appId: "1:680510483192:web:02e86148652922a25ae90d",
  databaseURL: "https://jsfirebaseassignment-730f0-default-rtdb.firebaseio.com/"
};

/* Initialization of app, database and authentication */
const app = firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database();
const auth = firebase.auth();

//export the variables
export { app, dbRef, auth };