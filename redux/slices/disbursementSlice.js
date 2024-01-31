"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

export const getDisbursementById = createAsyncThunk(
  "disbursement/loan-application",
  async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}/disbursement/loan-application/${id}`,
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

const disbursementSlice = createSlice({
  name: "disbursement",
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
      .addCase(getDisbursementById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getDisbursementById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getDisbursementById.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = disbursementSlice.actions;

export default disbursementSlice.reducer;
