import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAH36ItnV42jAGhX_vy25QwaG8qcVxt0L8",
  authDomain: "charlie-chat-app.firebaseapp.com",
  databaseURL: "https://charlie-chat-app.firebaseio.com",
  projectId: "charlie-chat-app",
  storageBucket: "charlie-chat-app.appspot.com",
  messagingSenderId: "505277207575"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const realTimeDb = firebase.database();

export function setupPresence(user: any) {
  realTimeDb
    .ref(".info/connected")
    .on(
      "value",
      (snapshot: firebase.database.DataSnapshot | null | undefined) => {
        if (snapshot) console.log(snapshot.val());
      }
    );
}

export default firebase;
export { db };
