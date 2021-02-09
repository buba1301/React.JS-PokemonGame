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
class FireBase {
  constructor() {
    firebase.initializeApp(firebaseConfig);

    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonsSoket = (cb) => {
    this.database.ref('pokemons').on('value', (snapshot) => {
      cb(snapshot.val());
    });
  };

  getPokemonsOnce = async () => {
    return await this.database
      .ref('pokemons')
      .once('value')
      .then((snapshot) => snapshot.val());
  };

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  };

  addPokemon = (data, cb) => {
    const newKey = this.database.ref().child('pokemons').push().key;
    this.database
      .ref('pokemons/' + newKey)
      .set(data)
      .then(() => cb());
  };
}

export default FireBase;
