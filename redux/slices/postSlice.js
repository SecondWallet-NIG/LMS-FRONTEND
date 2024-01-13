// store/slices/postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createPost = createAsyncThunk('post/createPost', async (postData) => {
  const response = await axios.post('/api/posts', postData);
  return response.data;
});

export const updatePost = createAsyncThunk('post/updatePost', async ({ postId, updatedData }) => {
  const response = await axios.put(`/api/posts/${postId}`, updatedData);
  return response.data;
});

export const getPost = createAsyncThunk('post/getPost', async () => {
  const response = await axios.get(`https://cat-fact.herokuapp.com/facts/`);
  
  return response.data;
});



const postSlice = createSlice({
  name: 'post',
  initialState: {
    data: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    // Reducer logic for actions not handled by createAsyncThunk
    clearPostState: (state) => {
      state.data = null;
      state.loading = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(getPost.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearPostState } = postSlice.actions;

export default postSlice.reducer;
