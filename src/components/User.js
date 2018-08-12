import React, { Component } from 'react';
import '../main.css';

export default class User extends Component {


  render() {
    const { name, petName, avatarURL, email, teamMembers } = this.props;

    return (
      <div className="user-border">
        {/* <h1>## User Component ## </h1> */}
        <figure className="user_info">
          <h3>Name: {name}</h3>
          <h3>Pet Name Group: {petName}</h3>
          <h3> Team Members: {teamMembers}</h3>
          <h3>e-mail: {email}</h3>
          <h3><img className="profile-photo" src={avatarURL}/></h3>

        </figure>
      </div>

    );
  }
}