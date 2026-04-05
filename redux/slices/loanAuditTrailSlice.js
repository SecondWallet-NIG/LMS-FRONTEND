import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}

export const getLoanAuditTrail = createAsyncThunk(
  "loanAuditTrail/fetch",
  async ({ loanId, page = 1, per_page = 25 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/loan-application/${loanId}/audit-trail`,
        {
          params: { page, per_page },
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        error.message ||
        "Failed to load audit trail";
      return rejectWithValue(msg);
    }
  }
);

const loanAuditTrailSlice = createSlice({
  name: "loanAuditTrail",
  initialState: {
    data: null,
    loading: "idle",
    error: null,
  },
  reducers: {
    clearLoanAuditTrail: (state) => {
      state.data = null;
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoanAuditTrail.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getLoanAuditTrail.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getLoanAuditTrail.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message;
      });
  },
});

export const { clearLoanAuditTrail } = loanAuditTrailSlice.actions;

export default loanAuditTrailSlice.reducer;
