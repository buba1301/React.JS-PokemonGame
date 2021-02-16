import { createSlice } from '@reduxjs/toolkit';
import fireBaseClass from '../service/firebase';

const slice = createSlice({
  name: 'pokemons',
  initialState: {
    isLoading: false,
    data: {},
    error: null,
  },
  reducers: {
    fetchPokemons: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchPokemonsResolve: (state, { payload }) => ({
      ...state,
      isLoading: false,
      data: payload,
    }),
    fetchPokemonsReject: (state, { payload }) => ({
      ...state,
      isLoading: false,
      data: {},
      error: payload,
    }),
  },
});

export const {
  fetchPokemons,
  fetchPokemonsResolve,
  fetchPokemonsReject,
} = slice.actions;

export const selectPokemonsLoading = (state) => state.pokemons.isLoading;
export const selectPokemonsData = (state) => state.pokemons.data;

export const getPokemons = () => async (dispatch) => {
  dispatch(fetchPokemons());

  try {
    const data = await fireBaseClass.getPokemonsOnce();
    dispatch(fetchPokemonsResolve(data));
  } catch (e) {
    dispatch(fetchPokemonsReject(e));
  }
};

export const pokemons = slice.reducer;
