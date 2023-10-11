// store/configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice'
import customerReducer from './slices/customerSlice';


export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    auth: authReducer,
    customer: customerReducer
  },
  // Add middleware or other configuration options as needed
});

