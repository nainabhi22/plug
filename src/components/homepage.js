import React from "react";
import Header from "./Header";
import { signInWithGoogle } from '../firebase/firebase.utils';
import { auth } from '../firebase/firebase.utils';
import { getDatabase, ref, set , onValue } from "firebase/database";
import axios from "axios";
import Card_ from "./card";
import App from "../App";
import EditStatus from "./editstatus";
const database = getDatabase();
export default class Home_Page extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentUser: null,
            all_users : [],
            current_user_data : {},
            from : 0,
            to : 0
          };
    }
    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            console.log(user)
          this.setState({ currentUser: user });
        });
        this.getData()
       
       
      }
    
      componentWillUnmount() {
        this.unsubscribeFromAuth();
      }

      writeUserData(userId, name, email, imageUrl,like,dislike,bookmark, bookmarked_by) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
          username: name,
          email: email,
          profile_picture : imageUrl,
          like : like,
          dislike : dislike,
          bookmark : bookmark,
          bookmarked_by : bookmarked_by

        });
      }

    getData(){
        const db = getDatabase();
        const starCountRef = ref(db, 'users/');
        let list_data = []
        let current_user_data_ = {}
        onValue(starCountRef, (snapshot) => {
            list_data=[]
        const data = snapshot.val();
        // console.log(this.state.currentUser)
        if(this.state.currentUser){
            let user = this.state.currentUser.uid
            for(let val in data){
                if(val!=user){
                let obj = data[val]
                obj['uid'] = val
                list_data.push(obj)
                }else{
                    let obj = data[val]
                    obj['uid'] = val
                    // list_data.push(obj)
                    current_user_data_=obj
                }
            }
        
        
        
        console.log(list_data)
        list_data.sort((a,b)=>{
            console.log(a)
            console.log(data)
            if( this.state.currentUser.uid in  data[a['uid']]['bookmark'] && this.state.currentUser.uid in  data[b['uid']]['bookmark'])
            {
                return Object.keys(b['like']).length - Object.keys(a['like']).length
            }
            else if(this.state.currentUser.uid in data[a['uid']]['bookmark'])
            return -1
            else if(this.state.currentUser.uid in data[b['uid']]['bookmark'])
            return 1
            else if(Object.keys(b['like']).length != Object.keys(a['like']).length)
            return Object.keys(b['like']).length - Object.keys(a['like']).length
            else
            return Object.keys(a['dislike']).length - Object.keys(b['dislike']).length
        })
        console.log(list_data)
        if(this.state.all_users.length == 0)
        this.setState({all_users : list_data,current_user_data:current_user_data_,from:0,to:Math.min(10,list_data.length)})
        else
        this.setState({all_users : list_data,current_user_data:current_user_data_})
        // updateStarCount(postElement, data);
        // });
        }
    })
  
}


    

    render(){
    
        console.log(this.state.currentUser)
        console.log(this.state.all_users)

        if(this.state.currentUser){

        return(
            <>
            <Header/>
            <EditStatus cid={this.state.currentUser.uid} current_user_data={this.state.current_user_data} />
            <div>
                <button className="btn" onClick={(e)=>{
                    if(Math.max(0,this.state.from-10)!=this.state.from)
                    this.setState({from:Math.max(0,this.state.from-10),to:this.state.from})
                }} >Previous</button>
                <button className="btn" onClick={(e)=>{
                    if(this.state.to!=Math.min(this.state.to+10,this.state.all_users.length))
                    this.setState({from:this.state.to,to:Math.min(this.state.to+10,this.state.all_users.length)})
                }} >next</button>
                <p>From user {this.state.from+1} to {this.state.to}</p>
                <p style={{color:'#007AFF',fontSize:'20px'}} >Total users :- {this.state.all_users.length}</p>
            </div>
            <div style={{width:'100%'}}>
            {
                this.state.all_users.slice(this.state.from,this.state.to).map((data)=>{
                    console.log(data)
                    let a,b,c
                    a=b=c=false
                    
                    if(this.state.currentUser.uid in data['like'] )
                    a=true
                    if(this.state.currentUser.uid in data['dislike'] )
                    b=true
                    if(this.state.currentUser.uid in data['bookmark'] )
                    c=true
                    return(
                        <div  style={{float : 'left'}} >
                            <Card_ name={data.username} img_url={data.profile_picture} status={data.status} isliked={a} isdislike={b} isstared={c} uid = {data.uid} c_uid={this.state.currentUser.uid} number_like = {Object.keys(data['like']).length} number_dislike = {Object.keys(data['dislike']).length} />
                        </div>
                    )
                })
            }
            </div>
            
            
            </>
        );
    }else{
        return(
            <>
            <App/>
            </>
        );
    }
}
}