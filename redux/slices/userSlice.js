// store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Replace the URL with your user-related API endpoints
export const createUser = createAsyncThunk('user/createUser', async (userData) => {
  const response = await axios.post('/api/user', userData);
  return response.data;
});

export const loginUser = createAsyncThunk('user/loginUser', async (loginData) => {
  try {
    const response = await axios.post('https://secondwallet-stag.onrender.com/api/auth/login', loginData);
    return response.data;
  } catch (error) {
    if (error.response.data.error === "Incorrect email or password") {
      throw new Error("Please check all inputs and fill correctly")
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ userId, updatedData }) => {
  const response = await axios.put(`/api/user/${userId}`, updatedData);
  return response.data;
});

export const getUser = createAsyncThunk('user/getUser', async (userId) => {
  const response = await axios.get(`/api/user/${userId}`);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
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
      .addCase(createUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(createUser.rejected, (state, action,) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action,) => {
        console.log("action.error.message", action.error.message);
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = userSlice.actions;

export default userSlice.reducer;
