import React, { Component } from 'react';
import { db } from '../services/firebase';
import fire from '../services/firebase';
import './postForm.css';

export default class PostForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      postText: ''
    };
  }

  addPostToFB() {
    db.collection('posts').add({
      name: this.props.currentUserName,
      petName: this.props.petName,
      uid: this.props.uid,
      postText: this.state.postText,
      time: new Date().toLocaleDateString(),
    })
      .then(this.setState({
        postText: '',
        time: ''
      }))
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  }


handleSubmit = async(event) => {
  event.preventDefault();
  await this.addPostToFB();
};

handleChange = ({ target }) => {
  this.setState({ [target.name] : target.value });
};

render(){

  return (
    <div><h2>## Post FORM ##</h2>
      <form className="post-form" onSubmit={(event) => this.handleSubmit(event)}>
        <fieldset>
          <label htmlFor="postText"> 
            <input name="postText" value={this.state.postText} onChange={this.handleChange}/>
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
}
