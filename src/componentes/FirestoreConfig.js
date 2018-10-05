import firebase from 'firebase/app';
import 'firebase/firebase-firestore';

firebase.initializeApp({
    apiKey: "AIzaSyDzUkvNCmsmAbqbI4xF1CeeLSpPiOLeHYg",
    authDomain: "social-network-6eb8a.firebaseapp.com",
    projectId: "social-network-6eb8a",
})

let db= firebase.firestore();
db.settings({timestampsinSnapshots:true});

export default db;
