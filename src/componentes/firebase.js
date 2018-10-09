import firebase from 'firebase'

let config = {
    apiKey: "AIzaSyDzUkvNCmsmAbqbI4xF1CeeLSpPiOLeHYg",
    authDomain: "social-network-6eb8a.firebaseapp.com",
    databaseURL: "https://social-network-6eb8a.firebaseio.com",
    projectId: "social-network-6eb8a",
    storageBucket: "social-network-6eb8a.appspot.com",
    messagingSenderId: "250841734328"
  };
  
const fire =  firebase.initializeApp(config);

// export const ref = firebase.database().ref();
 

export default fire;