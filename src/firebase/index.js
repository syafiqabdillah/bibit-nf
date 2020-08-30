import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCELQ4Ft3JybNJONXoN5SbRg2GNt0uz-nY",
  authDomain: "bantu-bisnis-teman-fd669.firebaseapp.com",
  databaseURL: "https://bantu-bisnis-teman-fd669.firebaseio.com",
  projectId: "bantu-bisnis-teman-fd669",
  storageBucket: "bantu-bisnis-teman-fd669.appspot.com",
  messagingSenderId: "780945316797",
  appId: "1:780945316797:web:e8036ecfa09237bc8bd0d4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}