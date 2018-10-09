import React from 'react';
import ReactDOM from 'react-dom'; // ENFOCADO AL NAVEGADOR
//import fire from './componentes/firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';// hace que la aplicacion funcione sin internet 

  
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
