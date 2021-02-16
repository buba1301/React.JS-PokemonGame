import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'pokemons',
  initialState: {
    isLoading: false,
    data: {},
    error: null,
  },
  reducers: {},
});

export const pokemonActions = slice.actions;
export const pokemon = slice.reducer;

export const selectPokemonsLoading = (state) => state.pokemons.isLoading;
