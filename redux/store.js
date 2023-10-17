// store/configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice'
import customerReducer from './slices/customerSlice';
import roleReducer from './slices/roleSlice';


export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    auth: authReducer,
    customer: customerReducer,
    role: roleReducer
  },
  // Add middleware or other configuration options as needed
});

