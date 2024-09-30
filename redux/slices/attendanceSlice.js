import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";
import { getToken } from "@/helpers";

export const clockIn = createAsyncThunk("clock-in", async () => {
  try {
    let token = getToken();
    if (!token) throw new Error("Token not provided");
    const response = await axios.patch(
      `${API_URL}/attendance/clock-in`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data : error.message);
  }
});

export const clockOut = createAsyncThunk("clock-out", async () => {
  try {
    let token = getToken();
    if (!token) throw new Error("Token not provided");
    const response = await axios.patch(
      `${API_URL}/attendance/clock-out`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data : error.message);
  }
});

export const getCurrentDayAttendance = createAsyncThunk(
  "attendance/current-day",
  async () => {
    try {
      let token = getToken();
      if (!token) throw new Error("Token not provided");
      const response = await axios.get(`${API_URL}/attendance/current-day`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
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
      .addCase(getCurrentDayAttendance.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getCurrentDayAttendance.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getCurrentDayAttendance.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = attendanceSlice.actions;

export default attendanceSlice.reducer;