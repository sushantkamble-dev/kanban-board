import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA1DJ0flTZBiphB7Ih_8QSkiWOmc-uCPMs",
    authDomain: "kanban-board-e4f4b.firebaseapp.com",
    projectId: "kanban-board-e4f4b",
    storageBucket: "kanban-board-e4f4b.appspot.com",
    messagingSenderId: "301802308023",
    appId: "1:301802308023:web:013e42d7e5f411d8652832",
    measurementId: "G-B8JKRTP55P"
  };

  firebase.initializeApp(firebaseConfig)

  export default firebase