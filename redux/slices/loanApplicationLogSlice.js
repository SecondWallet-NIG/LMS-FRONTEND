import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}

export const getLoanApplicationLogs = createAsyncThunk('loanApplication/logs', async (loanId) => {
    try {
      const response = await axios.get(`${API_URL}/loan-application/logs/${loanId}`, {
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
    }});

const LoanApplicationLogSlice = createSlice({
  name: "loanApplicationLog",
  initialState: {
    data: null,
    loading: "idle",
    error: null,
  },
  reducers: {
    clearUserState: (state) => {
      state.data = null;
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getLoanApplicationLogs.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getLoanApplicationLogs.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getLoanApplicationLogs.rejected, (state, action,) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { clearUserState } = LoanApplicationLogSlice.actions;

export default LoanApplicationLogSlice.reducer;