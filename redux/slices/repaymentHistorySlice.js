import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}

export const getAllRepaymentHistory = createAsyncThunk(
  "repaymentHistory/all",
  async () => {
    try {
      const response = await axios.get(
        `${API_URL}/repayment/payment-history-all`,
        {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else throw new Error("An error occured, please try again later");
    }
  }
);

export const getSingleRepayment = createAsyncThunk(
  "repaymentHistory/single",
  async (repaymentId) => {
    try {
      const response = await axios.get(
        `${API_URL}/repayment/payment-history-all/${repaymentId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else throw new Error("An error occured, please try again later");
    }
  }
);

const repaymentHistorySlice = createSlice({
  name: "repaymentHistory",
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
      .addCase(getAllRepaymentHistory.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getAllRepaymentHistory.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllRepaymentHistory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getSingleRepayment.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getSingleRepayment.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSingleRepayment.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = repaymentHistorySlice.actions;

export default repaymentHistorySlice.reducer;
