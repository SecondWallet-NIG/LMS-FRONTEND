"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}

// Trigger loan interest accruals
export const triggerLoanInterestAccruals = createAsyncThunk(
  "accruals/trigger-loan-interest",
  async () => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/trigger/loan-interest`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("An error occurred while triggering loan interest accruals");
      }
    }
  }
);

// Trigger investment interest accruals
export const triggerInvestmentInterestAccruals = createAsyncThunk(
  "accruals/trigger-investment-interest",
  async () => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/trigger/investment-interest`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("An error occurred while triggering investment interest accruals");
      }
    }
  }
);

// Trigger overdue accruals
export const triggerOverdueAccruals = createAsyncThunk(
  "accruals/trigger-overdue-accruals",
  async () => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/trigger/overdue-accruals`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("An error occurred while triggering overdue accruals");
      }
    }
  }
);

// Trigger all accruals
export const triggerAllAccruals = createAsyncThunk(
  "accruals/trigger-all",
  async () => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/trigger/all-accruals`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("An error occurred while triggering accruals");
      }
    }
  }
);

const accrualsSlice = createSlice({
  name: "accruals",
  initialState: {
    loading: false,
    error: null,
    lastTriggered: null,
    results: null,
  },
  reducers: {
    clearAccrualsState: (state) => {
      state.loading = false;
      state.error = null;
      state.results = null;
    },
  },
  extraReducers: (builder) => {
    // Loan Interest Accruals
    builder
      .addCase(triggerLoanInterestAccruals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(triggerLoanInterestAccruals.fulfilled, (state, action) => {
        state.loading = false;
        state.lastTriggered = new Date().toISOString();
        state.results = action.payload;
      })
      .addCase(triggerLoanInterestAccruals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Investment Interest Accruals
      .addCase(triggerInvestmentInterestAccruals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(triggerInvestmentInterestAccruals.fulfilled, (state, action) => {
        state.loading = false;
        state.lastTriggered = new Date().toISOString();
        state.results = action.payload;
      })
      .addCase(triggerInvestmentInterestAccruals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Overdue Accruals
      .addCase(triggerOverdueAccruals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(triggerOverdueAccruals.fulfilled, (state, action) => {
        state.loading = false;
        state.lastTriggered = new Date().toISOString();
        state.results = action.payload;
      })
      .addCase(triggerOverdueAccruals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // All Accruals
      .addCase(triggerAllAccruals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(triggerAllAccruals.fulfilled, (state, action) => {
        state.loading = false;
        state.lastTriggered = new Date().toISOString();
        state.results = action.payload;
      })
      .addCase(triggerAllAccruals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearAccrualsState } = accrualsSlice.actions;
export default accrualsSlice.reducer;








