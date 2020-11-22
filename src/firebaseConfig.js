import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8BRpj1dNriW7D9mQLKErLpa4FtWy9Jwc",
  authDomain: "pokeapi-redux.firebaseapp.com",
  databaseURL: "https://pokeapi-redux.firebaseio.com",
  projectId: "pokeapi-redux",
  storageBucket: "pokeapi-redux.appspot.com",
  messagingSenderId: "116662613814",
  appId: "1:116662613814:web:fc29cb881671604aab6597",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.storage();
const auth = firebase.auth();
const provider = firebase.auth.GoogleAuthProvider;

export { db, auth, provider };
