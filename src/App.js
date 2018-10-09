import React, { Component } from 'react';
import firebase from 'firebase';
import fire from './componentes/firebase.js';
import './App.css';
import GoogleLogo from "./images/google-logo-icon-PNG-Transparent-Background.png";
import Logo from "./images/logo.png";
import Logo2 from "./images/logo2.png";
import Post from './componentes/todos.js';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Modal, ModalHeader, ModalBody, ModalFooter 

  } from 'reactstrap';
  
  

 

 

class App extends Component {
  constructor(props){
    super(props);// es el que esta heredando a la clase 
    this.state = { // define el estado del componente 
      user: null,
      name:"",
      email:"",
      password:"",
      registrar:"",
      registrarpwd:""

    };
    this.login = this.login.bind(this);
    this.createUser = this.createUser.bind(this);
    this.handleAuth = this.handleAuth.bind(this);// referenciamos al metodo
    this.handleLogout = this.handleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  componentWillMount(){
    fire.auth().onAuthStateChanged(user =>{
      //cuando inicie sesion se vera la informacion del usuario  
      this.setState({user});
    });
  }

  handleAuth(){ 
    const provider = new firebase.auth.GoogleAuthProvider(); // hace la funcionalidad de google como proveedor
    fire.auth().signInWithPopup(provider) //llama a la api de firebase 
    .then(result => console.log(`${result.user.email} inicio sesion`))
    .catch(error => console.log(error.message));
  }
  handleLogout(){
    firebase.auth().signOut()
    .then(response  => console.log(`${response.user.email} cerro sesion`))
    .catch(error => console.log(error.message));
  }

  //   creatUser () {
  //   firebase.auth().createUserWithEmailAndPassword(this.state.registrar, this.state.registrarpwd)
  //     .then(saveUser)
  //     .catch((error) => console.log('Oops', error))
  // }

  // saveUser() {
  //    const userName = this.state.name; 
  //    console.log(userName);
  // }

  login(e){
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((u)=>{
    })
    .catch((error)=>{
        
    console.log(error);
    });    
    
    }
 createUser(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      alert('Cuenta creada exitosa')
      const userName = this.state.email;
      console.log(userName);
    })
        .catch((error) => {
            console.log(error.message);
        })
}
handleChange(e){
  const { value, name } = e.target;
 this.setState({
  [name]: value 
}) 
}

  renderLoginButton(){// por el estado el componente se vuelve a mostrar 
    //inicio sesion 
    if(this.state.user){
      return(  
          <div>
            <Navbar color="light" light expand="md">
            <NavbarBrand href="/">
              <img src={Logo2} width ="90" id="logo2-ux" alt="" /></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
              <img width="50 " border-radius="150" src= {this.state.user.photoURL} alt={this.state.user.displayName}/>
            </NavItem>
            <NavItem>
             <p>Bienvenidx {this.state.user.displayName}</p>
            </NavItem>
              <NavItem>
                <NavLink href="/muro/">Muro</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/DianaOlvera">GitHub</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.handleLogout}>cerrar sesion</NavLink>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>
          {/* <img width="100 "src= {this.state.user.photoURL} alt={this.state.user.displayName}/>
          <p>Hola {this.state.user.displayName}!</p> */}
          {/* <Post />  */}
          {/* <form class="form">
          <p>{this.state.user.displayName}!</p>
          <textarea class= "form-control" placeholder="Agrega un comentario"></textarea>
          <button className="btn btn-outline-dark" id="btn-publicar" onClick={this.login}>publicar</button>
          </form> */}

          <Post/>
    </div>
    //<Redirect to ="/muro"/>

      )
    }else {
      return(
        
        <div>
          <div className="App-header">
        <h1 color="white">UX-COM</h1>
        <img src={Logo} id="logo-ux" alt="" />
        </div>
      <form class="container">
      <p>
        Forma parte de nuestra comunidad:
        </p>
          <input id="inputEmail" value={this.state.email} onChange={this.handleChange} type="email"name='email' className="Form-input "  placeholder="Email" />
          <input id="inputPassword" className="Form-input" value={this.state.password} onChange={this.handleChange} type="password"name='password'placeholder="Password"/>
          
          {/* <button className="login-buttons" id="btn-crear" onClick={this.createUser}>Registrar</button> */}
          <button className="btn btn-outline-dark" data-toggle="modal" data-target="#Modal">
            Registrar
        </button> 
          <button className="btn btn-outline-dark" id="btn-sing" onClick={this.login}>SingUp</button>
          </form>
        <button className="login-buttons" id="btn-google" onClick={this.handleAuth}>
              <img src={GoogleLogo} alt="" />Google</button>


              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <input placeholder="Name" value={this.state.name} onChange={this.handleChange}></input> 
            <input placeholder="Correo" id="registryEmail" name='registryEmail' value={this.state.registryEmail} onChange={this.handleChange}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
              

            </div>
      );

    }
  }


  render() {
    return (
      <div className="App">
      
        
        <p className="App-intro">
       
        {this.renderLoginButton()}
        </p>
      </div>
    );
  }
}

export default App;
