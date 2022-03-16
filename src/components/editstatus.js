import React from "react";
import { auth } from '../firebase/firebase.utils';
import { getDatabase, ref, set , onValue } from "firebase/database";
import axios from "axios";
import Card_ from "./card";
const database = getDatabase();
export default class EditStatus extends React.Component{
    constructor(props){
        super(props)
        this.state={status : ''}
    }
    writeUserData(userId) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId +'/status'),this.state.status);
      }
    render(){
        // alert(this.props.current_user_data.status)
        
        return(
            <div>
            <div>
                <h1 style={{fontFamily:'monospace'}} >Your profile</h1>
                <aside className="profile-card" style={{}} >
  
            <header>
                
                <a href="http://ali.shahab.pk">
                <img src={this.props.current_user_data.profile_picture}></img>
                </a>

                <h1>{this.props.current_user_data.username}</h1>
                
                <h2>Another Web Designer</h2>
                
            </header>
            
            <div className="profile-bio">
                
                <p>{this.props.current_user_data.status}</p>
                
            </div>
            
            <hr></hr>
            {/* <div style={{paddingBottom:'3rem'}} >
            <div style={{width : '6rem', marginLeft:'0rem',float : 'left' , border:'none',color:like_color}} onClick={()=>{this.likeAction(this.props.uid,this.props.c_uid)}} > <AiFillLike size="2rem"  /> {this.props.number_like} </div>
            <div style={{width : '6rem' ,  marginLeft:'0rem',float : 'left',border:'none',color:discolor}} onClick={()=>{this.dislikeAction(this.props.uid,this.props.c_uid)}} ><AiFillDislike size="2rem" /> {this.props.number_dislike} </div>
            <div style={{width : '6rem' , marginLeft:'0rem', float : 'left',border:'none',color:star_color}} onClick={()=>{this.bookmarkAction(this.props.uid,this.props.c_uid)}} ><AiFillStar size="2rem" /></div>
            </div> */}
            
            </aside>
            </div>
            <div style={{margin:'1rem'}} >
                    <textarea style={{width : '60%'}} placeholder="Change your status" value={this.state.status} onChange={(e)=>{
                        this.setState({status : e.target.value})
                    }} /><br/>
                    <button className="update" onClick={(e)=>{
                        e.preventDefault()
                        this.writeUserData(this.props.cid)
                    }} >Update status</button>

            </div>
            </div>
        )
    }
}