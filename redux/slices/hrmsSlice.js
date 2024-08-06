import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";
import { getToken } from "@/helpers";

export const getAllBenefitTypes = createAsyncThunk(
  "benefit-type/all",
  async () => {
    try {
      let token = getToken();
      const response = await axios.get(`${API_URL}/benefit-type`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else throw new Error("An error occured, please try again later");
    }
  }
);

export const addNewBenefitTypes = createAsyncThunk(
  "benefit-type",
  async (payload) => {
    try {
      let token = getToken();

      console.log({ token });
      const response = await axios.post(`${API_URL}/benefit-type`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else throw new Error("An error occured, please try again later");
    }
  }
);

const hrmsSlice = createSlice({
  name: "hrms",
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
      .addCase(getAllBenefitTypes.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getAllBenefitTypes.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllBenefitTypes.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = hrmsSlice.actions;

export default hrmsSlice.reducer;
