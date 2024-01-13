import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}

export const getApprovalAssignee = createAsyncThunk(
  "approval/assignee",
  async (assigneeId) => {
    try {
      const response = await axios.get(
        `${API_URL}/loan-application/task/${assigneeId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        }
      );
      console.log("",response.data?.data?.data);
      return response.data?.data?.data;
    } catch (error) {
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else throw new Error("An error occured, please try again later");
    }
  }
);

const ApprovalAssigneeSlice = createSlice({
  name: "ApprovalAssignee",
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
      .addCase(getApprovalAssignee.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getApprovalAssignee.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getApprovalAssignee.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = ApprovalAssigneeSlice.actions;

export default ApprovalAssigneeSlice.reducer;
