import { API_URL } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}

export const getEmployeeBenefitsActivityLogs = createAsyncThunk(
  "employeeBenefits/logs",
  async (employeeBenefitId) => {
    try {
      const response = await axios.get(
        `${API_URL}/employee-benefit/logs/${employeeBenefitId}`,
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
      } else throw new Error("An error occurred, please try again later");
    }
  }
);

const EmployeeBenefitsActivityLogSlice = createSlice({
  name: "employeeBenefitsLog",
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
      .addCase(getEmployeeBenefitsActivityLogs.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getEmployeeBenefitsActivityLogs.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getEmployeeBenefitsActivityLogs.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = EmployeeBenefitsActivityLogSlice.actions;

export default EmployeeBenefitsActivityLogSlice.reducer;
