import firebase from "firebase/compat/app";
import "firebase/compat/database";


const firebaseConfig = {
    apiKey: "AIzaSyCj3f2nig5X1NytfnNVP9RjpkBNT7oiJXQ",
    authDomain: "web-restaurant-fc3f3.firebaseapp.com",
    projectId: "web-restaurant-fc3f3",
    storageBucket: "web-restaurant-fc3f3.appspot.com",
    messagingSenderId: "949299801871",
    appId: "1:949299801871:web:0f2ef76d215ca4b644d87a"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();