import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyBdiiCC9uUZUU1Dn2XcESBxFRnGqWR87pU",
  authDomain: "p4game-4622f.firebaseapp.com",
  databaseURL: "https://p4game-4622f.firebaseio.com",
  projectId: "p4game-4622f",
  storageBucket: "p4game-4622f.appspot.com",
  messagingSenderId: "445371981569"
};
// const config = process.env.NODE_ENV === 'production'
//   ? prodConfig
//   : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};