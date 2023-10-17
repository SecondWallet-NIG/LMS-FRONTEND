// store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@/constant';

export const loginUser = createAsyncThunk('user/loginUser', async (loginData) => {
    try {
      const response = await axios.post(API_URL +'/auth/login', loginData);
      return response.data;
    } catch (error) {
      if (error.response.data.error === "Incorrect email or password") {
        throw new Error("Incorrect email or password")
      }
      else throw new Error("An error occured, please try again later")
    }
  });

export const getRoles = createAsyncThunk('role/getRoles', async () => {
  const response = await axios.get(`${API_URL}/role/all`);
  console.log("response.data",response.data);
  return response.data;
});


const roleSlice = createSlice({
  name: 'role',
  initialState: {
    data: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    // Reducer logic for actions not handled by createAsyncThunk
    clearUserState: (state) => {
      state.data = null;
      state.loading = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getRoles.rejected, (state, action,) => {
        console.log("action.error.message", action.error.message);
        state.loading = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { clearUserState } = roleSlice.actions;

export default roleSlice.reducer;
