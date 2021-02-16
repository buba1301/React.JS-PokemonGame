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
  selectGameSelectedPokemons,
  selectGamePlayer2Pokemons,
  selectGameResult,
  game,
} from './game';

export const actions = {
  fetchPokemons,
  fetchPokemonsResolve,
  fetchPlayer2PokemonsReject,
  fetchPokemonsReject,
  addSelectedPokemon,
  addResult,
  fetchGameData,
  fetchPlayer2PokemonsResolve,
};

export const asyncActions = {
  getPokemons,
  getPlayer2Pokemons,
};

export const selectors = {
  selectPokemonsLoading,
  selectPokemonsData,
  selectGameSelectedPokemons,
  selectGamePlayer2Pokemons,
  selectGameResult,
};

export default combineReducers({
  pokemons,
  game,
});
