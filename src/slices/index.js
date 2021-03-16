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

import {
  addSelectedPokemon,
  fetchPlayer2PokemonsResolve,
  fetchPlayer2PokemonsReject,
  fetchGameData,
  getPlayer2Pokemons,
  addResult,
  clearBoard,
  selectGameSelectedPokemons,
  selectGamePlayer2Pokemons,
  selectGameResult,
  game,
} from './game';

import {
  fetchUser,
  updateUser,
  removeUser,
  selectUserFetch,
  selectUser,
  selectUserLocalId,
  getUserUpdateAsync,
  getUserAsync,
  user,
} from './user';

export const actions = {
  fetchPokemons,
  fetchPokemonsResolve,
  fetchPlayer2PokemonsReject,
  fetchPokemonsReject,
  addSelectedPokemon,
  addResult,
  clearBoard,
  fetchGameData,
  fetchPlayer2PokemonsResolve,
  fetchUser,
  updateUser,
  removeUser,
};

export const asyncActions = {
  getPokemons,
  getPlayer2Pokemons,
  getUserAsync,
  getUserUpdateAsync,
};

export const selectors = {
  selectPokemonsLoading,
  selectPokemonsData,
  selectGameSelectedPokemons,
  selectGamePlayer2Pokemons,
  selectGameResult,
  selectUserFetch,
  selectUser,
  selectUserLocalId,
};

export default combineReducers({
  pokemons,
  game,
  user,
});
