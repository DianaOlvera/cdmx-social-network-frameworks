import React, { Component } from 'react';
import firebase from 'firebase';
//import fire from './componentes/firebase.js';
//import {Row, Col, Card} from 'reactstrap'
import Postdata from './dataPost.js';
import { Card, CardText, CardBody } from 'reactstrap';


const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
const db = firebase.firestore();



class Post extends Component { 
 
    constructor(props){
    super(props);
    this.state={
    post:'',
    }
    this.handleChangePost = this.handleChangePost.bind(this);
    this.createPost = this.createPost.bind(this);
}

    handleChangePost(e){
        const { value, name } = e.target;
        this.setState({
         [name]: value 
        })    
      }

    createPost(){
    db.collection("users").add({
        post: this.state.post,
        likes: 0   
        }).then((docRef)=> {
            console.log("Document written with ID: ", docRef.id);        
        }).catch((error)=>{
            console.error("Error adding document: ", error);
        });  
        }


 
        
    render(){
        return(
    <Card>
      <CardBody>
        <CardText >
        <textarea value={this.state.post} onChange={this.handleChangePost} name='post' className="form-control" id="commentary" />
        </CardText>
        <button  onClick={this.createPost} type="button" className="btn btn-raised btn-secondary btn-sm mt-3" id="button-topost">
        Publicar  </button>  
      </CardBody>
      <Postdata/>
    </Card>

);



    }
}

export default Post;