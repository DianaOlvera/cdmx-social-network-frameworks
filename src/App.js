import React, { Component } from 'react';
import { button, Navbar } from 'reactstrap';
import firebase from 'firebase';
import './App.css';
// import './componentes/Login';
// import './componentes/Home'
 //import nav from'./componentes/nav';

class App extends Component {
  constructor(){
    super();// es el que esta heredando a la clase 
    this.state = { // define el estado del componente 
      user: null
    };
    this.handleAuth = this.handleAuth.bind(this);// referenciamos al metodo
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user =>{
      //cuando inicie sesion se vera la informacion del usuario  
      this.setState({user});
    });
  }

  handleAuth(){ 
    const provider = new firebase.auth.GoogleAuthProvider(); // hace la funcionalidad de google como proveedor
    firebase.auth().signInWithPopup(provider) //llama a la api de firebase 
    .then(result => console.log(`${result.user.email} inicio sesion`))
    .catch(error => console.log(error.message));
  }
  handleLogout(){
    firebase.auth().signOut()
    .then(response  => console.log(`${response.user.email} cerro sesion`))
    .catch(error => console.log(error.message));
  }

  renderLoginButton(){// por el estado el componente se vuelve a mostrar 
    //inicio sesion 
    if(this.state.user){
      return(  
          <div>
          <img width="100 "src= {this.state.user.photoURL} alt={this.state.user.displayName}/>
          <p>Hola {this.state.user.displayName}!</p>
          <button color="danger" onClick={this.handleLogout}>Cerrar Sesion</button>
          

<div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Create an account</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
                    <div className="row">                       
                                <input type="text" className="form-control registry-btn mr-4 ml-4 mt-2 mb-2" placeholder="Comentario" id="registryName"   name='name'  value={this.state.name} onChange={this.handleChange} />                       
                          </div>         
            <div className="modal-footer">
              <button type="button" onClick={this.createPost} className="btn btn-dark" id="Registrar">Publicar</button>
                                
            </div>
          </div>
        </div>
      </div>
    </div>

      )
    }else {
      return(
        <button onClick={this.handleAuth}>Google</button>
      );

    }
  }


  render() {
    return (
      <div className="App">
      <nav/>
        <div className="App-header">
          <h1 className="App-title">UX-COM</h1>
        </div>
        <p className="App-intro">
        {this.renderLoginButton()}
        </p>
      </div>
    );
  }
}

export default App;
