// store/slices/userSlice.js
"use client"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@/constant';

let user;
if (typeof window !== 'undefined') {
  user = JSON.parse(localStorage.getItem("user"));
}

export const createInterestType = createAsyncThunk('interestType/create', async (payload) => {
  try {
    const response = await axios.post(API_URL + '/interest-type/create', {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    }, payload);
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }

  }
});

export const getInterestType = createAsyncThunk('interestType/all', async () => {
  const response = await axios.get(`${API_URL}/interest-type/all`, {
    headers: {
      Authorization: `Bearer ${user?.data?.token}`
    }
  });
  return response.data;
});

export const calculateInterest = createAsyncThunk('interest/calculate', async (payload) => {
  const response = await axios.post(`${API_URL}/interest-type/calculate`, payload);
  return response.data;
});

const interestTypeSlice = createSlice({
  name: 'interestType',
  initialState: {
    data: null,
    interestValue: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    clearUserState: (state) => {
      state.data = null;
      state.interestValue = null,
        state.loading = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInterestType.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getInterestType.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getInterestType.rejected, (state, action,) => {
        console.log("action.error.message", action.error.message);
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(calculateInterest.pending, (state) => {

        state.loading = 'pending';
        state.error = null;
      })
      .addCase(calculateInterest.fulfilled, (state, action) => {
        console.log({ state });
        state.loading = 'succeeded';
        state.interestValue = action.payload;
      })
      .addCase(calculateInterest.rejected, (state, action,) => {
        console.log("action.error.message", action.error.message);
        state.loading = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { clearUserState } = interestTypeSlice.actions;

export default interestTypeSlice.reducer;
