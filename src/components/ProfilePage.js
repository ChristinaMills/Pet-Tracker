import React, { Component } from 'react';
import firebase, { db } from '../services/firebase';
import FileUploader from 'react-firebase-file-uploader';


export default class ProfilePage extends Component {
  
  state = {
    username: '',
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: ''
  };
    

  handleChangeUsername = (event) => this.setState({ username: event.target.value });

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = (progress) => this.setState({ progress });

  handleUploadError = (error) => {
    this.setState({ isUploading: false  });
    console.error(error);
  };

  handleUploadSuccess = (filename) => {
    this.setState({
      avatar: filename, 
      progress: 100, 
      isUploading: false
    });

    firebase.storage().ref('images').child(filename).getDownloadURL()
      .then(url => this.setState({  avatarURL: url  }));
  };

  render() {
    return (
      <div>
        <h2>This is the profile component</h2>
        <form>
          <label>Username:</label>
          <input type="text" value={this.state.username} name="username" onChange={this.handleChangeUsername} />
          <label>Avatar:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} />}

          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />

        </form>
      </div>
    );
  }
}

// const { name, petName } = this.props;
 
// return (
//   <div>
//     <h1>## User Component ## </h1>
//     <p>Connect User Profile information</p>
//     <figure className="user_info">
//       <h3>Name: {name}</h3>
//       <h3>Pet Name Group: {petName}</h3>
//     </figure>
//   </div>

// );