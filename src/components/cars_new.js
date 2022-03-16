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
const { Meta } = Card;

export default class Card_ extends React.Component{
    constructor(props){
        super(props)
    }
    
render(){
    let arr = []
    let like_color,discolor,star_color
    if(this.props.isliked == true)
    arr.push(<LikeFilled />)
    else
    like_color = "black"
    if(this.props.isdislike == true)
    discolor = "blue"
    else
    discolor = "black"
    if(this.props.isstared == true)
    star_color = "blue"
    else
    star_color = "black"

    return(
        <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src={this.props.img_url}
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      title={this.props.name}
      description={this.props.status}
    />
  </Card>
    )

}
}