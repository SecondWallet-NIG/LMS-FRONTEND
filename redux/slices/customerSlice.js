// store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@/constant';

const user = JSON.parse(localStorage.getItem("user"));

export const createCustomer = createAsyncThunk('customer/create', async (payload) => {
  try {
    const response = await axios.post(API_URL +'/customer/profile-information/create' , payload , {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response.data.error === "Incorrect email or password") {
      throw new Error("Incorrect email or password")
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const createEmployment = createAsyncThunk('employment/create', async (payload) => {
  try {
    console.log(".....", user?.data?.token);
    const response = await axios.post(API_URL +'/employment/create', payload, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });
    return response.data;
  } catch (error) {

    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const getCustomerById = createAsyncThunk('customer/getCustomerById', async (customerId) => {
  try {
 
    const response = await axios.get(`${API_URL}/customer/profile-information/${customerId}`, {
   
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const getCustomers = createAsyncThunk('customer/getCustomers', async () => {
  try {
    const response = await axios.get(`${API_URL}/customer/profile-information/all`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });
    console.log({response});
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const getCustomerSummary = createAsyncThunk('customer/getSummary', async () => {
  try {
    const response = await axios.get(`${API_URL}/customer/summary`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }
    else throw new Error("An error occured, please try again later")
  }
});

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
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(createEmployment.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(createEmployment.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(createEmployment.rejected, (state, action,) => {
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
      .addCase(getCustomers.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action,) => {
        console.log("action.error.message", action.error.message);
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(getCustomerSummary.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getCustomerSummary.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getCustomerSummary.rejected, (state, action,) => {
        console.log("action.error.message", action.error.message);
        state.loading = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { clearUserState } = customerSlice.actions;

export default customerSlice.reducer;
