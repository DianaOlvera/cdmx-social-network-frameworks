import React, { Component } from 'react';
import firebase from 'firebase';
import { Card, CardTitle, CardText } from 'reactstrap';


const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
const db = firebase.firestore();

 class Postdata extends Component{ 
    constructor(){
        super();
        this.state = ({
            posts : [],
            likes: 0
          }) 
          this.removePost = this.removePost.bind(this);
          
    }

    componentDidMount(){
 
        db.collection("users").onSnapshot((querySnapshot) => {
            const posts = [];
           querySnapshot.forEach((doc) => {
               const {name,post} = doc.data();
               posts.push({
                name, 
                post,
                id:doc.id
              });
           });
       
           this.setState({posts});
          });
    }

    removePost(id){
        db.collection("users").doc(id).delete()
        .then(()=> {
            console.log("Document successfully deleted!");
        }).catch((error)=> {
            console.error("Error removing document: ", error);
        });  
        
    }

    
    render(){
    const{posts}=this.state;
    return(  
<div>
{posts.map((item) => (
    <div key={item.id}>
      <Card inverse>
    
          <CardTitle>Card Title</CardTitle>
          <CardText><textarea id={item.id} className="form-control text-sm-left" readOnly >{item.post}
            </textarea></CardText>
          <CardText>
            <small className="text-muted"> <li className="list-inline-item pr-2"><a className="white-text"  id ={"edit" + item.id} >Editar</a></li>
                  <li className="list-inline-item pr-2"><a className="white-text" id ='remove{item.id}' onClick={() => this.removePost(item.id)}  >Eliminar</a></li>
                </small>
          </CardText>
       
      </Card>
      </div>
        ))}
    </div>
);

}


}


export default Postdata;