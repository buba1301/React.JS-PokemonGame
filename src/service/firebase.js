import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAW7bHJ-V-RjVvoHbEt55jLEC7hDPySjL0',
  authDomain: 'pokemon-game-5e47a.firebaseapp.com',
  databaseURL: 'https://pokemon-game-5e47a-default-rtdb.firebaseio.com',
  projectId: 'pokemon-game-5e47a',
  storageBucket: 'pokemon-game-5e47a.appspot.com',
  messagingSenderId: '808192928172',
  appId: '1:808192928172:web:c22581c6fb884b83ccb209',
};

firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const database = fire.database();
