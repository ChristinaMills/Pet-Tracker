import firebase from 'firebase';
import firestore from 'firebase/firestore';

export const config = {
  apiKey: 'AIzaSyAzRZ3hYuFtC9MRkB7hsGHAjEhYz2d9U3I',
  authDomain: 'pupdates-b98c3.firebaseapp.com',
  projectId: 'pupdates-b98c3',
  databaseURL: 'https://pupdates-b98c3.firebaseio.com',
  storageBucket: 'pupdates-b98c3.appspot.com',
  messagingSenderId: '368611683684'
};


const fire = firebase.initializeApp(config);

export const db = fire.firestore();

export default fire;

