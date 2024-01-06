"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}

export const getDashboardCardData = createAsyncThunk("dashboard/card-data", async () => {
  try {
    const response = await axios.get(
      `${API_URL}/dashboard/cards-data`,
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
});

export const getDashboardGraphData = createAsyncThunk("dashboard/graph-data", async () => {
  try {
    const response = await axios.get(
      `${API_URL}/dashboard/graph-data`,
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
});



const DashboardSlice = createSlice({
  name: "dashboardData",
  initialState: {
    data: null,
    data1: null,
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
      .addCase(getDashboardCardData.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getDashboardCardData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getDashboardCardData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getDashboardGraphData.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getDashboardGraphData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data1 = action.payload;
      })
      .addCase(getDashboardGraphData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
  },
});

export const { clearUserState } = DashboardSlice.actions;

export default DashboardSlice.reducer;
