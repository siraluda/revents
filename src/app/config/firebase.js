import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC1SGsO5BOXAy368tJIdiLK6lkOKBlrUZ8",
    authDomain: "revents-dbaf6.firebaseapp.com",
    databaseURL: "https://revents-dbaf6.firebaseio.com",
    projectId: "revents-dbaf6",
    storageBucket: "revents-dbaf6.appspot.com",
    messagingSenderId: "441461476369",
    appId: "1:441461476369:web:adaf81f3797d13474a35b0"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;
