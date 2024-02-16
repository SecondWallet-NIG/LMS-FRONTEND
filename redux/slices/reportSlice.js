import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}

export const getSummaryReport = createAsyncThunk(
  "SummaryReport/all",
  async () => {
    const response = await axios.get(`${API_URL}/report/summary/cards-data`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`,
      },
    });
    return response.data;
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: {
    data: null,
    loading: "idle",
    error: null,
  },
  reducers: {
    // Reducer logic for actions not handled by createAsyncThunk
    clearUserState: (state) => {
      state.data = null;
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSummaryReport.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getSummaryReport.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSummaryReport.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = reportSlice.actions;

export default reportSlice.reducer;
