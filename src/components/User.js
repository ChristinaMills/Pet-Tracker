import React, { Component } from 'react';
import { db } from '../services/firebase';
import fire from '../services/firebase';

export default class User extends Component {


  render() {
    const { name, petName, avatarURL, avatar } = this.props;
    console.log(avatarURL, avatar);

    return (
      <div>
        <h1>## User Component ## </h1>
        <figure className="user_info">
          <h3>Name: {name}</h3>
          <h3>Pet Name Group: {petName}</h3>
          <h3><img src={avatarURL}/></h3>

        </figure>
      </div>

    );
  }
}