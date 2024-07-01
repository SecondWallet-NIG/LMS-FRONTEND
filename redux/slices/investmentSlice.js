import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}

// investmentProducts

export const createInvestmentProduct = createAsyncThunk(
  "investment/product/create",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/investment/product/create`,
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
      } else throw new Error("An error occured, please try again later");
    }
  }
);

export const getSingleInvestmentProduct = createAsyncThunk(
  "investment/product/investmentProductId",
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/investment/product/${id}`, {
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

export const deleteSingleInvestmentProduct = createAsyncThunk(
  "investment/product/investmentProductId/delete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/investment/product/${id}/delete`,
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

export const updateProduct = createAsyncThunk(
  "investment/product/investmentProductId/update",
  async ({ id, payload }) => {
    try {
      const response = await axios.put(
        `${API_URL}/investment/product/${id}/update`,
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
      } else throw new Error("An error occured, please try again later");
    }
  }
);

// investMentRecords

export const createInvestment = createAsyncThunk(
  "investment/create",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/investment/create`,
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
      } else throw new Error("An error occured, please try again later");
    }
  }
);

// InvestorRecords

export const createInvestor = createAsyncThunk(
  "investment/investor/create",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/investment/investor/create`,
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
      } else throw new Error("An error occured, please try again later");
    }
  }
);

export const getSingleInvestor = createAsyncThunk(
  "investment/investor/investorProfileId",
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/investment/investor/${id}`, {
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

// investmentProducts

const investmentSlice = createSlice({
  name: "investment",
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
      .addCase(getSingleInvestor.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getSingleInvestor.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSingleInvestor.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getSingleInvestmentProduct.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getSingleInvestmentProduct.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSingleInvestmentProduct.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = investmentSlice.actions;

export default investmentSlice.reducer;
