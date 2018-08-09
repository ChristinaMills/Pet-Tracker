import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire, { db } from '../services/firebase';
import FileUploader from 'react-firebase-file-uploader';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      petName: '',
      email: '',
      password: '',
      avatar: '',
      isUploading: false,
      progress: 0,
      avatarURL: ''
    };
  }

 
login = (e) => {
  e.preventDefault();
  fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((u) => {})
    .catch((error) => { console.log(error); });
};

handleChange = ({ target }) => {
  this.setState({ [target.name]: target.value });
};

signUp = (e) => {
  e.preventDefault();
  fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((user) => {
      //we are naming the document id by iud explicity here
      db.collection('users').doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        name: this.state.name,
        petName: this.state.petName,
        avatar: this.state.avatar,
        // avatarURL: this.state.avatarURL
      });
    })
    .catch((error) => {console.log('Error adding document', error);});
};

//photo upload
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

    fire.storage().ref('images').child(filename).getDownloadURL()
      .then(url => this.setState({  avatarURL: url  }))

      .then(() => {
        this.props.getAvatar();
      });
  };

  render() {

    return (
      <div className="col-md-6">
        <form>
          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <input value={this.state.name} onChange={this.handleChange} name="name" id="inputName"/>
          </div>
          <div className="form-group">
            <label htmlFor="petName">Pet Name: </label>
            <input value={this.state.petName} onChange={this.handleChange} name="petName" id="petName"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" id="email" className="form-control" placeholder="Enter email " />  
            <small id="email-help">We will never share your email!</small> 
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password: </label>
            <input value={this.state.password} onChange={this.handleChange} name="password" id="inputPassword"/>
          </div>
          <div>
            <label>Avatar:</label>
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            {this.state.avatarURL && <img src={this.state.avatarURL} />}

            <FileUploader
              accept="image/*"
              name="avatar"
              randomizeFilename
              storageRef={fire.storage().ref('images')}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </div>
        
          <br/>
          <button type="submit" onClick={this.login}>Login</button>
          <br/>
          <button onClick={this.signUp}>Sign Up</button>
        
        </form>
      </div>
    );
  }
}

export default Login;

