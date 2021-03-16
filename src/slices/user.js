import { createSlice } from '@reduxjs/toolkit';
import apiRoutes from '../api';

const slice = createSlice({
  name: 'user',
  initialState: {
    isLoading: true,
    data: {},
  },
  reducers: {
    fetchUser: () => ({
      isLoading: true,
    }),
    updateUser: (state, { payload }) => ({
      isLoading: false,
      data: payload,
    }),
    removeUser: () => ({
      isLoading: false,
      data: {},
    }),
  },
});

export const { fetchUser, updateUser, removeUser } = slice.actions;

export const selectUserFetch = (state) => state.user.isLoading;
export const selectUser = (state) => state.user.data;
export const selectUserLocalId = (state) => state.user.data?.localId;

export const getUserUpdateAsync = () => async (dispatch) => {
  const idToken = localStorage.getItem('idToken');

  if (idToken) {
    const requistOptions = {
      method: apiRoutes.getUser.method,
      body: JSON.stringify({ idToken }),
    };

    const response = await fetch(
      apiRoutes.getUser.url,
      requistOptions
    ).then((res) => res.json());

    if (response.hasOwnProperty('error')) {
      localStorage.removeItem('idToken');
      dispatch(removeUser());
    } else {
      const [user] = response.users;
      dispatch(updateUser(user));
    }
  } else {
    dispatch(removeUser());
  }
};

export const getUserAsync = () => (dispatch) => {
  dispatch(fetchUser());
  dispatch(getUserUpdateAsync());
};

export const user = slice.reducer;
