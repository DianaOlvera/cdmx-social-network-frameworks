import React from 'react';
import ReactDOM from 'react-dom'; // ENFOCADO AL NAVEGADOR
import firebase from 'firebase';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';// hace que la aplicacion funcione sin internet 


firebase.initializeApp({
    apiKey: "AIzaSyDzUkvNCmsmAbqbI4xF1CeeLSpPiOLeHYg",
    authDomain: "social-network-6eb8a.firebaseapp.com",
    databaseURL: "https://social-network-6eb8a.firebaseio.com",
    projectId: "social-network-6eb8a",
    storageBucket: "social-network-6eb8a.appspot.com",
    messagingSenderId: "250841734328"
  });
  
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
