import { createSlice } from '@reduxjs/toolkit';
import routes from '../service/routes';

const slice = createSlice({
  name: 'game',
  initialState: {
    isLoading: false,
    selectedPokemons: {},
    player2Pokemons: [],
    error: null,
  },
  reducers: {
    addSelectedPokemon: (state, { payload: { key, selectedPokemon } }) => {
      if (state.selectedPokemons[key]) {
        const copySelectedPokemonsState = { ...state.selectedPokemons };
        delete copySelectedPokemonsState[key];

        return copySelectedPokemonsState;
      }

      return {
        ...state,
        selectedPokemons: {
          ...state.selectedPokemons,
          [key]: selectedPokemon,
        },
      };
    },
    fetchGameData: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchPlayer2PokemonsResolve: (state, { payload }) => ({
      ...state,
      isLoading: false,
      player2Pokemons: payload,
    }),
    fetchPlayer2PokemonsReject: (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: payload,
    }),
  },
});

export const {
  addSelectedPokemon,
  fetchGameData,
  fetchPlayer2PokemonsResolve,
  fetchPlayer2PokemonsReject,
} = slice.actions;

export const selectGameSelectedPokemons = (state) =>
  state.game.selectedPokemons;
export const selectGamePlayer2Pokemons = (state) => state.game.player2Pokemons;

export const getPlayer2Pokemons = () => async (dispatch) => {
  dispatch(fetchGameData());

  try {
    const palyer2Response = await fetch(routes.getPlayer2.url);
    const palyer2Request = await palyer2Response.json();

    dispatch(fetchPlayer2PokemonsResolve(palyer2Request.data));
  } catch (e) {
    dispatch(fetchPlayer2PokemonsReject(e));
  }
};

export const game = slice.reducer;
