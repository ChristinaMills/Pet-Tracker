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
    const text = this.props.postText;
    const user = this.props.currentUserName;
    const time = this.props.time;

    return (
      <div>
        <div className='post-container'>
          <h4 className='user-name'>User name:{user}</h4>
          <a className='post-text'>{text}</a>
          <a className='time'>{time}</a>
        </div>

      </div>
    );
  }
}

//TODO: editing function