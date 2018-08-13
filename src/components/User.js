import React, { Component } from 'react';
import '../main.css';

export default class User extends Component {


  render() {
    const { name, petName, avatarURL, email, teamMemberNames } = this.props;

    return (
      <div className="user-border">
        {/* <h1>## User Component ## </h1> */}
        <figure className="user_info">
          <p><img className="profile-photo" src={avatarURL}/></p>
          <p className="userInfoField">Name: {name}</p>
          <p className="userInfoField">Pet Name Group: {petName}</p>
          <p className="userInfoField"> Team Members: {teamMemberNames}</p>
          <p className="userInfoField">e-mail: {email}</p>
        </figure>
      </div>

    );
  }
}