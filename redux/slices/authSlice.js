// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true'); // Set in localStorage
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.setItem('isAuthenticated', 'false'); // Clear in localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

