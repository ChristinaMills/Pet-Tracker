import React, { Component, Fragment } from 'react';
import Post  from './Post';
import './postlist.css';
import fire, { db } from '../services/firebase';

export default class PostsList extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      uid: ''
    };
  }
  
  render(){

    return (
      <Fragment>
        <h2># Post List #</h2>
        <ul>{this.props.allPosts.map((post, index) => 
          <Post key={index} currentUserName={post.name} postText={post.postText} time={post.time} avatarURL={this.props.avatarURL}/>)}
        </ul>
        
      </Fragment>
   
    );
  }
}
