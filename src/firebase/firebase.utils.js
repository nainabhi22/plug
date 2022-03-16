// firebase.utils.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase } from "firebase/database";
const config = {
  apiKey: "AIzaSyBQOemhPdozM4UQmbm_Sryu-I2is522aN8",
  authDomain: "plug-61c4e.firebaseapp.com",
  databaseURL: "https://plug-61c4e-default-rtdb.firebaseio.com",
  projectId: "plug-61c4e",
  storageBucket: "plug-61c4e.appspot.com",
  messagingSenderId: "939474984395",
  appId: "1:939474984395:web:6a996df9f70c7c3a7d6a4e",
  measurementId: "G-HZXCPB2HX1"
};

const app = firebase.initializeApp(config);
export const database = getDatabase(app);
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;