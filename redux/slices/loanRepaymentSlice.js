import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}

export const getAllRepayments = createAsyncThunk("repayment/all", async () => {
  try {
    const response = await axios.get(
      `${API_URL}/repayment`,
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

export const getLoanApplicationRepayments = createAsyncThunk(
  "repayment/getSingleRepayment",
  async (loadApplicationId) => {
    try {
      const response = await axios.get(
        `${API_URL}/repayment/loan-application/${loadApplicationId}`,
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

export const getRepaymentSummary = createAsyncThunk(
  "repayment/summary",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/repayment/summary`, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
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

const LoanRepaymentSlice = createSlice({
  name: "LoanRepayment",
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
      .addCase(getAllRepayments.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getAllRepayments.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllRepayments.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getLoanApplicationRepayments.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getLoanApplicationRepayments.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getLoanApplicationRepayments.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getRepaymentSummary.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getRepaymentSummary.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getRepaymentSummary.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = LoanRepaymentSlice.actions;

export default LoanRepaymentSlice.reducer;
