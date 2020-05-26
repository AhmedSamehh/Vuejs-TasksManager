import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyC27Q5OvUqY9MhB_scIBJ2feP3buFWt0tc",
    authDomain: "todolist-se7a.firebaseapp.com",
    databaseURL: "https://todolist-se7a.firebaseio.com",
    projectId: "todolist-se7a",
    storageBucket: "todolist-se7a.appspot.com",
    messagingSenderId: "81008769884",
    appId: "1:81008769884:web:de3a046e8af43a3a651f99",
    measurementId: "G-RJ29G7EFXN"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  export default db;