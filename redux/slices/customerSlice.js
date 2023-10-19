// store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@/constant';

export const createCustomer = createAsyncThunk('customer/create', async (payload) => {
  try {
    const response = await axios.post(API_URL +'/customer/profile-information/create', payload);
    return response.data;
  } catch (error) {
    if (error.response.data.error === "Incorrect email or password") {
      throw new Error("Incorrect email or password")
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const getCustomerById = createAsyncThunk('customer/getCustomerById', async (customerId) => {
  try {
    const response = await axios.get(`${API_URL}/customer/profile-information/${customerId}`);
    console.log({response});
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }
    else throw new Error("An error occured, please try again later")
  }
});

// export const getVerifyToken = createAsyncThunk('auth/getToken', async (payload) => {
//   try {
//     const response = await axios.post(API_URL +'/auth/reset-password/verify-email', payload);
//     return response.data;
//   } catch (error) {
//     if (error.response.data.error === "User not found") {
//       throw new Error("User not found")
//     }
//     else throw new Error("An error occured, please try again later")
//   }
// });

// export const verifyToken = createAsyncThunk('auth/verifyToken', async (payload) => {
//   try {
//     const response = await axios.post(API_URL +'/auth/reset-password/verify-token ', payload);
//     return response.data;
//   } catch (error) {
//     if (error.response.data.error === "Invalid Token! Try again") {
//       throw new Error("Invalid Token! Try again")
//     }
//     else throw new Error("An error occured, please try again later")
//   }
// });

// export const updateUser = createAsyncThunk('user/updateUser', async ({ userId, updatedData }) => {
//   const response = await axios.put(`/api/user/${userId}`, updatedData);
//   return response.data;
// });

// export const getUser = createAsyncThunk('user/getUser', async (userId) => {
//   const response = await axios.get(`/api/user/${userId}`);
//   return response.data;
// });

// export const resetPassword = createAsyncThunk('auth/restPassword', async (payload) => {
//   try {
//     const response = await axios.post(API_URL +'/auth/reset-password ', payload);
//     return response.data;
//   } catch (error) {
//     if (error.response.data.error === "Invalid Token! Try again") {
//       throw new Error("Invalid Token! Try again")
//     }
//     else throw new Error("An error occured, please try again later")
//   }
// });
const customerSlice = createSlice({
  name: 'customer',
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
      .addCase(createCustomer.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(createCustomer.rejected, (state, action,) => {
        console.log("action.error.message", action.error.message);
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(getCustomerById.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getCustomerById.rejected, (state, action,) => {
        console.log("action.error.message", action.error.message);
        state.loading = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { clearUserState } = customerSlice.actions;

export default customerSlice.reducer;
