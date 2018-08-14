import React, { Component } from 'react';
import { db } from '../services/firebase';
import fire from '../services/firebase';
import './post.css';

export default class Post extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      postText: ''
    };
  }


  render(){

    const { time, currentUserName, postText, avatarURL } = this.props;

    return (
      <li>
        <div className='post-container'>
          <img className="profile-photo" src={avatarURL}/>
          <p className='user-name'>{currentUserName}</p>
          <p className='post-text'>{postText}</p>
          <p className='time'>{time}</p>
        </div>

      </li>
    );
  }
}

//TODO: editing function