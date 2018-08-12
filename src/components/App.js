import React, { Component } from 'react';
import fire, { db } from '../services/firebase';
import Login from './Login';
import Home from './Home';

export default class App extends Component {

  constructor() {
    super();
    
    this.state = {
     
    };

    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ user });
        console.log('user from app', user);
      }
      else {
        this.setState({ user: null });
      }
    });
  }


  // getAvatar = (avatarFile) => {
  //   console.log('get avatra being called');
  //   this.setState({
  //     avatar: avatarFile
  //   });
  // };


  render() {
    return (
      <div className="App">
        { this.state.user ? <Home currentUserUid={this.state.user.uid} avatar={this.state.avatar}/> : <Login getAvatar={this.getAvatar}/> }
      </div>
      
    );

  }
}