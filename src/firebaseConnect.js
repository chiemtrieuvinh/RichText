
import * as firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDG-CzZD_Svml2mN_svBROqJNkNGGhZ0-4",
    authDomain: "richtext-5373e.firebaseapp.com",
    databaseURL: "https://richtext-5373e.firebaseio.com",
    projectId: "richtext-5373e",
    storageBucket: "richtext-5373e.appspot.com",
    messagingSenderId: "584988079710"
  };
  firebase.initializeApp(config);

  var data = firebase.database().ref('dataForRichText/');

