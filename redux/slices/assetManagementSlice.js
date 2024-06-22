import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}

export const getAllAssets = createAsyncThunk("asset/all", async () => {
  const response = await axios.get(`${API_URL}/asset/all`, {
    headers: {
      Authorization: `Bearer ${user?.data?.token}`,
    },
  });
  return response.data;
});

export const getAllAssetCategories = createAsyncThunk(
  "asset/category",
  async () => {
    const response = await axios.get(`${API_URL}/asset-category`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`,
      },
    });
    return response.data;
  }
);

export const creatAssetCategory = createAsyncThunk(
  "/asset-category/create",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/asset-category/create`,
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

export const createNewAsset = createAsyncThunk(
  "/asset/create",
  async (payload) => {
    try {
      const response = await axios.post(`${API_URL}/asset/create`, payload, {
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

const assetManagementSlice = createSlice({
  name: "asset",
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
      .addCase(getAllAssets.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getAllAssets.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllAssets.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(createNewAsset.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createNewAsset.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(createNewAsset.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = assetManagementSlice.actions;

export default assetManagementSlice.reducer;
