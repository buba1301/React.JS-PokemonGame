import { combineReducers } from 'redux';
import { pokemonActions, pokemon } from './pokemons';

export const actions = {
  ...pokemonActions,
};

export default combineReducers({
  pokemon,
});
