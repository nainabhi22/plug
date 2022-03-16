// App.js
import React from 'react';
import './App.css';
import Home_Page from './components/homepage';
import { signInWithGoogle } from './firebase/firebase.utils';
import { auth } from './firebase/firebase.utils';
import Header from './components/Header';
import { getDatabase, ref, set } from "firebase/database";
import axios from 'axios';
import firebase from 'firebase/compat/app';
const database = getDatabase();
class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
    
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  writeUserData(userId, name, email, imageUrl,like,dislike,bookmark,bookmarked_by) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl,
      status : "Specialties are Creative UI, HTML5, CSS3, Semantic Web, Responsive Layouts, Web Standards Compliance, Performance Optimization, Cross Device Troubleshooting."
    });
    set(ref(db, 'users/' + userId + '/like'),{userid:"newthing"});
    set(ref(db, 'users/' + userId + '/dislike'),{userid:"newthing"});
    set(ref(db, 'users/' + userId + '/bookmark'),{userid:"newthing"});
    set(ref(db, 'users/' + userId + '/bookmarked_by'),{userid:"newthing"});
  }
  login_with_email_pass(email,password,name,img_url){
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    
    this.writeUserData(user.uid,name,user.email , img_url ,0,0,0)
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    alert("try again")
    console.log(error)
    var errorCode = error.code;
    var errorMessage = error.message;
  });
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
  

  }

  render() {
    if (this.state.currentUser)
    {
      // console.log("hello")
      
      return (
        <Home_Page />
      );
    }
    else{
      console.log("hello")

      return (
        <div className='user-info'>
          <Header/>
          {/* {document.getElementById("names").innerHTML = "" } */}
            {/* {document.getElementById("logout").style.display = "none"}  */}
              <div className='card_login' style={{textAlign:"center", padding : "10rem 0rem 10rem 0rem"}}>
              <button  onClick={(e)=>{signInWithGoogle().then((user)=>{
                console.log(user)
                this.writeUserData(user.user.uid , user.user.displayName , user.user.email,  user.user.photoURL , 0,0,0,0)
                console.log("done")
                window.location.reload()
                
              })}} style={{borderRadius: "0" , backgroundColor:"White", padding:"10px"}}><img src="https://img.icons8.com/color/16/000000/google-logo.png"></img>  SIGN IN USING GOOGLE</button>
              <br/><br/>
              <button onClick={(e)=>{
                e.preventDefault()
                axios.get("https://randomuser.me/api/").then((data)=>{
                  console.log(data.data['results'][0]['email'])
                this.login_with_email_pass(data.data['results'][0]['email'],data.data['results'][0]['login']['password'],data.data['results'][0]['name']['first']+" "+data.data['results'][0]['name']['last'],data.data['results'][0]['picture']['medium'])
                }).catch((err)=>{

                })

              }}  style={{borderRadius: "0" , backgroundColor:"White", padding:"10px"}}>SIGN IN ANONYMOUSLY</button>
              </div>
        </div >
      );
    }
    
  }
}


export default App;
