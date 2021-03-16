const APIKey = 'AIzaSyAW7bHJ-V-RjVvoHbEt55jLEC7hDPySjL0';

const apiRoutes = {
  signUp: {
    method: 'POST',
    url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKey}`,
  },
  signIn: {
    method: 'POST',
    url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKey}`,
  },
  getUser: {
    method: 'POST',
    url: `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${APIKey}`,
  },
  getStartPokemons: {
    method: 'GET',
    url: 'https://reactmarathon-api.herokuapp.com/api/pokemons/starter',
  },
  addPlayerWithStartPokemons: {
    method: 'POST',
    url: 'https://pokemon-game-5e47a-default-rtdb.firebaseio.com',
  },
};

export default apiRoutes;
