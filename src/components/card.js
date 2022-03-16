import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { Card, Avatar } from 'antd';
import './header.css'
import { LikeFilled,LikeOutlined,DislikeFilled, DislikeOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import {AiFillLike} from 'react-icons/ai'
import {AiFillDislike} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
import { auth } from '../firebase/firebase.utils';
import { getDatabase, ref, set , onValue } from "firebase/database";
import axios from "axios";
const database = getDatabase();
const { Meta } = Card;

export default class Card_ extends React.Component{
    constructor(props){
        super(props)
    }
writeUserData(userId, c_uid) {
    const db = getDatabase();
    let c_uid_ = c_uid
    if(this.props.isliked == true){
        set(ref(db, 'users/' + userId + '/like/' + c_uid), null);
        return
    }
    set(ref(db, 'users/' + userId + '/like/' + c_uid), 1);
    set(ref(db, 'users/' + userId + '/dislike/' + c_uid), null);
    }
writeUserData1(userId, c_uid) {
const db = getDatabase();
let c_uid_ = c_uid
if(this.props.isdislike == true){
    set(ref(db, 'users/' + userId + '/dislike/' + c_uid), null);
    return
}
set(ref(db, 'users/' + userId + '/dislike/' + c_uid), 1);
set(ref(db, 'users/' + userId + '/like/' + c_uid),null);
}
writeUserData2(userId, c_uid) {
    const db = getDatabase();
    let c_uid_ = c_uid
    if(this.props.isstared == true){
        set(ref(db, 'users/' + userId + '/bookmark/' + c_uid),null);
        return;
    }
    set(ref(db, 'users/' + userId + '/bookmark/' + c_uid),1);
    }
likeAction(uid,c_uid) {
    this.writeUserData(uid , c_uid)
}
dislikeAction(uid,c_uid) {
    this.writeUserData1(uid , c_uid)
}
bookmarkAction(uid,c_uid) {
    this.writeUserData2(uid , c_uid)
}
render(){
    let like_color,discolor,star_color
    if(this.props.isliked == true)
    like_color = "blue"
    else
    like_color = "black"
    if(this.props.isdislike == true)
    discolor = "blue"
    else
    discolor = "black"
    if(this.props.isstared == true)
    star_color = "#ff9e07"
    else
    star_color = "black"
    return(
        <div className="card" >
            <aside className="profile-card">
  
            <header>
                
                <a href="">
                <img src={this.props.img_url}></img>
                </a>

                <h1>{this.props.name}</h1>
                
                <h2>Another Web Designer</h2>
                
            </header>
            
            <div className="profile-bio">
                
                <p>{this.props.status}</p>
                
            </div>
            
            <hr></hr>
            <div style={{paddingBottom:'3rem'}} >
            <div style={{width : '6rem', marginLeft:'0rem',float : 'left' , border:'none',color:like_color}} onClick={()=>{this.likeAction(this.props.uid,this.props.c_uid)}} > <AiFillLike size="2rem"  /> {this.props.number_like-1} </div>
            <div style={{width : '6rem' ,  marginLeft:'0rem',float : 'left',border:'none',color:discolor}} onClick={()=>{this.dislikeAction(this.props.uid,this.props.c_uid)}} ><AiFillDislike size="2rem" /> {this.props.number_dislike-1} </div>
            <div style={{width : '6rem' , marginLeft:'0rem', float : 'left',border:'none',color:star_color}} onClick={()=>{this.bookmarkAction(this.props.uid,this.props.c_uid)}} ><AiFillStar size="2rem" /></div>
            </div>
            
            </aside>
        </div>
    )

}
}