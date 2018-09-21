import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

class App extends Component {
  constructor(){
    super();// es el que esta heredando al constructor
    this.state = {
      user: null
    };
    this.handleAuth = this.handleAuth.bind(this);// referenciamos al objeto
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user =>{
      //cuando inicie sesion se vera la informacion del usuario  
      this.setState({user});
    });
  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} inicio sesion`))
    .catch(error => console.log(error.message));
  }
  handleLogout(){
    firebase.aunt().signOut()
    .then(result => console.log(`${result.user.email} cerro sesion`))
    .catch(error => console.log(error.message));
  }

  renderLoginButton(){
    //usuario logueado
    if(this.state.user){
      return(
          <div> 
          <img src= {this.state.user.photoURL} alt={this.state.user.displayName}/>
          <p>Hola {this.state.user.displayname}!</p>
          <button onClick={this.handleLogout}>Salir</button>
          </div>
          
      )
    }else {
      return(
        <button onClick={this.handleAuth}>Login con Google</button>
      );

    }
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">Login</h1>
        </div>
        <p className="App-intro">
        {this.renderLoginButton()}
        </p>
      </div>
    );
  }
}

export default App;
