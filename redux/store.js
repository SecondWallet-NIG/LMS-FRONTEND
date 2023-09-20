// store/configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
//import postSlice from './slices/postSlice';

export const store = configureStore({
  reducer: {
    post: postReducer,
    // Add other reducers here if needed
  },
  // Add middleware or other configuration options as needed
});

