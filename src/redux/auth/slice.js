import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [loginUser.fulfilled](state, { payload }) {
      const { user, token } = payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
      state.error = null;
      state.isRefreshing = false;
    },

    [registerUser.fulfilled](state, { payload }) {
      const { user, token } = payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
      state.error = null;
      state.isRefreshing = false;
    },

    [loginUser.pending](state) {
      state.isRefreshing = true;
    },

    [registerUser.pending](state) {
      state.isRefreshing = true;
    },

    [loginUser.rejected](state, payload) {
      state.error = payload.error;
      state.isRefreshing = false;
    },

    [registerUser.rejected](state, payload) {
      state.error = payload.error;
      state.isRefreshing = false;
    },
  },
});

export default authSlice.reducer;

export const selectUserState = (state) => state.user;
