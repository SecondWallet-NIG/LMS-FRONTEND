import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}



export const getStaffTasks = createAsyncThunk(
  "approval/staff",
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

const UserTaskSlice = createSlice({
  name: "UserTasks",
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
      .addCase(getStaffTasks.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getStaffTasks.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getStaffTasks.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = UserTaskSlice.actions;

export default UserTaskSlice.reducer;
