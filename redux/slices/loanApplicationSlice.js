// store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@/constant';

const user = localStorage.getItem("user");

export const createLoanApplication = createAsyncThunk('LoanApplication/create', async (payload) => {
    try {
      const response = await axios.post(API_URL +'/loan-application/create', payload ,  {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`
        }
      }, );
      return response.data;
    } catch (error) {
      if (error.response.data.error) {
        throw new Error(error.response.data.error)
      }
    }
});

export const getSingleLoan = createAsyncThunk('loanApplication/getSingleLoan', async (loanId) => {
  try {
    const response = await axios.get(`${API_URL}/loan-application/${loanId}`, {
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

export const getLoanApplication = createAsyncThunk('loanApplication/all', async () => {
  const response = await axios.get(`${API_URL}/loan-application/all`, {
    headers: {
      Authorization: `Bearer ${user?.data?.token}`
    }
  });
  return response.data;
});


const LoanApplicationSlice = createSlice({
  name: 'LoanApplication',
  initialState: {
    data: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    clearUserState: (state) => {
      state.data = null;
      state.loading = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoanApplication.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getLoanApplication.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getLoanApplication.rejected, (state, action,) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(getSingleLoan.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getSingleLoan.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getSingleLoan.rejected, (state, action,) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { clearUserState } = LoanApplicationSlice.actions;

export default LoanApplicationSlice.reducer;
