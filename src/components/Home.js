import React, { Component } from 'react';
import User from './User';
// import Note from './Note';
import PostForm from './PostForm';
import PostsList from './PostsList';
import fire, { db } from '../services/firebase';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      petName: '',
      posts: [],
      allPosts: [],
      teamMembersArr: [],
      uid: ''
    };
  }

  componentDidMount() {
    this.setState({
      uid: this.props.currentUserUid
    });

    this.loadUserInfoFromFB();
    this.getTeamMembers();
    this.getMemberPosts();
    this.loadUserPostsFromFB();

  }


  loadUserInfoFromFB = () => {

    let userColRef = db.collection('users');
    let userRef = userColRef.where('uid', '==', this.props.currentUserUid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          this.setState({
            name: data.name,
            petName: data.petName
          });
          this.getTeamMembers();
        });
      });
  };


  //not active
  loadAllPostsFromFB = () => {
    db.collection('posts').get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, ' => ', doc.data());
      });
    });
  };



  loadUserPostsFromFB = () => {
    let postsRef = db.collection('posts');

    let userDoc = postsRef.where('uid', '==', this.props.currentUserUid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data();
         
          this.setState({
            posts: [
              ...this.state.posts,
              {
                name: data.name,
                postText: data.postText,
                time: data.time,
                uid: data.uid
              }
            ]
          });
        });
      });
  };
  

  getTeamMembers = () => {
    // console.log('TEAM', this.state.petName);
    let teamMembersArr = [];
    let usersRef = db.collection('users');
    let teamDocs = usersRef.where('petName', '==', this.state.petName).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          let memberUid = data.uid;
          teamMembersArr[memberUid] ? console.log('its already in there ') : teamMembersArr.push(memberUid);//don't mutate this if possible!
        });
      })
      .then(() => {
        this.setState({
          teamMembersArr
        });
      })
      .then(() => {
        this.getMemberPosts();
      });
  };

  containsObject(obj, list) {
    for(let i = 0; i < list.length; i++) {
      if(list[i].id === obj.id) {
        return true;
      }
    }
    return false;
  }

  getMemberPosts = () => {
    let postsRef = db.collection('posts');
    let teamMembers = this.state.teamMembersArr;
    
    teamMembers.forEach(memberUid => {
      postsRef.where('uid', '==', memberUid)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            let data = doc.data();
            let obj = {
              name: data.name,
              postText: data.postText,
              time: data.time,
              uid: data.uid,
              id: doc.id
            };
            if(!this.containsObject(obj, this.state.allPosts)) {
              // let myPosts = this.state.allPosts.slice()
              // console.log('my posts are', myPosts);
              // myPosts.push(obj);
              this.setState({
                allPosts: [...this.state.allPosts, obj]
              });
            }
            // let newPostArr = this.state.allPosts.filter((post, i) => {
            //   return post.id !== doc.id && i < this.state.allPosts.length;
            // });

          });
        });
    });
  };

  filterPosts = (allPosts) => {
    let postIdArr = [];
    allPosts.forEach((post) => {
      postIdArr.push(post.id);
    });
    
    console.log('&&&&&&&', postIdArr);
  };

  logout = () => {
    fire.auth().signOut();
  };

  render() {
    return (
      <div className="col-md-6">
        <h1>pUpdates</h1>
        <PostForm currentUserName={this.state.name} uid={this.state.uid} petName={this.state.petName}/>
        { this.state.name ? <User name={this.state.name} petName={this.state.petName}/> : null}
        { this.state.teamMembersArr ? <PostsList allPosts={this.state.allPosts} currentUserUid={this.props.currentUserUid} currentUserName={this.state.name} teamMembers={this.state.teamMembersArr}/>
          :
          null }

        <button onClick={this.logout}>Log Out</button>
      </div>
    );
  }
}


export default Home;
