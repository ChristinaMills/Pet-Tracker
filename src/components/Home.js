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
      uid: '',
      name: '',
      petName: '',
      posts: [],
      allPosts: [],
      teamMembersArr: [], //of uids
      email:'',
      teamMemberNames:[],
      avatarURL: ''

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
            petName: data.petName,
            avatarURL: data.avatarURL,
            email: data.email,
            uid: data.uid
          });
          this.getTeamMembers();
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
    let teamMembersArr = [];
    let usersRef = db.collection('users');
    let teamMemberNamesCopy = this.state.teamMemberNames.slice();
    let teamDocs = usersRef.where('petName', '==', this.state.petName).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          let memberUid = data.uid;
          let memberName = data.name;
          let memberEmail = data.email;
          console.log(memberName);
          teamMemberNamesCopy[memberName] ? console.log('member name already in array') : teamMemberNamesCopy.push(memberName);
          teamMembersArr[memberUid] ? console.log('member already in array') : teamMembersArr.push(memberUid);//don't mutate this if possible!
        });
      })
      .then(() => {
        this.setState({
          teamMembersArr,
          teamMemberNames: teamMemberNamesCopy.join(', ')

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
             
              this.setState({
                allPosts: [...this.state.allPosts, obj] 
              });
            }
          });
        });
    });
  };


  //? used
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
        <h3>pUpdates</h3>

        {/* { this.state.avatarURL ? <User name={this.state.name} petName={this.state.petName} avatarURL={this.state.avatarURL} teamMemberNames={this.state.teamMemberNames} email={this.state.email} />
          :
          null
        } */}
        {/* <img src={this.props.avatar}/> */}

        { this.state.avatarURL ? <PostForm avatarURL={this.state.avatarURL} currentUserName={this.state.name} uid={this.state.uid} petName={this.state.petName}/>
          :
          null }

        <PostsList allPosts={this.state.allPosts} avatarURL={this.state.avatarURL} currentUserUid={this.props.currentUserUid} currentUserName={this.state.name} teamMembers={this.state.teamMembersArr}/>
          
        <button onClick={this.logout}>Log Out</button>
      </div>
    );
  }
}


export default Home;
