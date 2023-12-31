import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}

export const createLoanPackage = createAsyncThunk(
  "loanPackage/create",
  async (payload) => {
    try {
      const response = await axios.post(
        API_URL + "/loan-package/create",
        payload,
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
      }
    }
  }
);

export const updateLoanPackage = createAsyncThunk(
  "loanPackage/update",
  async ({ loanPackageId, payload }) => {
    try {
      const response = await axios.put(
        `${API_URL}/loan-package/${loanPackageId}/update`,
        payload,
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
      }
    }
  }
);

export const getLoanPackage = createAsyncThunk("LoanPackage/all", async () => {
  const response = await axios.get(`${API_URL}/loan-package/all`, {
    headers: {
      Authorization: `Bearer ${user?.data?.token}`,
    },
  });
  return response.data;
});

export const getSingleLoanPackage = createAsyncThunk(
  "LoanPackage/single",
  async (id) => {
    const response = await axios.get(`${API_URL}/loan-package/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`,
      },
    });
    return response.data;
  }
);

const LoanPackageSlice = createSlice({
  name: "LoanPackage",
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
      .addCase(getLoanPackage.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getLoanPackage.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getLoanPackage.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(updateLoanPackage.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(updateLoanPackage.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateLoanPackage.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getSingleLoanPackage.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getSingleLoanPackage.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSingleLoanPackage.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = LoanPackageSlice.actions;

export default LoanPackageSlice.reducer;
