import { combineReducers } from 'redux';
import {
  fetchPokemons,
  fetchPokemonsResolve,
  fetchPokemonsReject,
  getPokemons,
  selectPokemonsLoading,
  selectPokemonsData,
  pokemons,
} from './pokemons';

export const actions = {
  fetchPokemons,
  fetchPokemonsResolve,
  fetchPokemonsReject,
};

export const asyncActions = {
  getPokemons,
};

export const selectors = {
  selectPokemonsLoading,
  selectPokemonsData,
};

export default combineReducers({
  pokemons,
});
