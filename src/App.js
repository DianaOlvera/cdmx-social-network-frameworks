import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import GoogleLogo from "./images/google-logo-icon-PNG-Transparent-Background.png";
import Logo from "./images/logo.png";
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
  

// import './componentes/Login';
// import './componentes/Home'
 //import nav from'./componentes/nav';
 

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
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((u)=>{
    })
    .catch((error)=>{
        
    console.log(error);
    });    
    
    }
 createUser(e) {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
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
          <img width="100 "src= {this.state.user.photoURL} alt={this.state.user.displayName}/>
          <p>Hola {this.state.user.displayName}!</p>
          <button color="danger" onClick={this.handleLogout}>Cerrar Sesion</button>
    </div>
    //<Redirect to ="/muro"/>

      )
    }else {
      return(
        
        <div>
          <Navbar color="light" light expand="md">
          <NavbarBrand href="/">UX-COM</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/muro/">Muro</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/DianaOlvera">GitHub</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/app.js/">cerrar sesion</NavLink>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>
        
          
       
  <form>
          <input id="inputEmail" value={this.state.email} onChange={this.handleChange} type="email"name='email' className="form-control mr-2"  placeholder="Email" />
          <input id="inputPassword" className="form-control mr-2" value={this.state.password} onChange={this.handleChange} type="password"name='password'placeholder="Password"/>
          
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
              
{/*Modal*/} 

{/* <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Create an account</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          

                    <div className="row">
                           
                                  <input type="text" className="form-control registry-btn mr-4 ml-4 mt-2 mb-2" placeholder="Nombre" id="registryName"   name='name'  value={this.state.name} onChange={this.handleChange} /> 
                      
                                   <input type="email" className="form-control registry-btn mr-4  mr-4 ml-4 mt-2 mb-2"   placeholder="Correo" id="registryEmail" name='registryEmail' value={this.state.registryEmail} onChange={this.handleChange}/>
                            
                                   <input type="password" className="form-control registry-btn mr-4 mr-4 ml-4 mt-2 mb-2"  placeholder="Contraseña" id="registryPassword" name='registryPassword' value={this.state.registryPassword} onChange={this.handleChange}/>
                          
                          </div>
    
                    
            
            <div className="modal-footer">
              <button type="button" onClick={this.createUser} className="btn btn-dark" id="Registrar">Crear</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              
             
            </div>
          </div>
        </div>
      </div> */}
            </div>
      );

    }
  }


  render() {
    return (
      <div className="App">
      <nav/>
        <div className="App-header">
        <img src={Logo} id="logo-ux" alt="" />
        </div>
        <p className="App-intro">
        {this.renderLoginButton()}
        </p>
      </div>
    );
  }
}

export default App;
