import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   // ...
//   // The value of `databaseURL` depends on the location of the database
//   databaseURL: "https://todofirebase-105a2.firebaseio.com/"
// };
const firebaseConfig = {
  apiKey: "AIzaSyC5l2CMFo8s1Pj9-2QQeSZl6e6mmzN8vl0",
  authDomain: "todofirebase-105a2.firebaseapp.com",
  databaseURL: "https://todofirebase-105a2.firebaseio.com",
  projectId: "todofirebase-105a2",
  storageBucket: "todofirebase-105a2.appspot.com",
  messagingSenderId: "149807983436",
  appId: "1:149807983436:web:c42d637d2a72e8bebd3de9",
  measurementId: "G-6Z4YZXTQ0Y"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
export  { database };
