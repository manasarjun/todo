import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAzEFBg-tI6qFSxXfc2SYLK_W3V-J4aVek",
  authDomain: "todo-d8246.firebaseapp.com",
  databaseURL: "https://todo-d8246.firebaseio.com",
  projectId: "todo-d8246",
  storageBucket: "todo-d8246.appspot.com",
  messagingSenderId: "918816790856",
  appId: "1:918816790856:web:f5613308dc211731367b7d",
  measurementId: "G-BQJEJX5QQX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase