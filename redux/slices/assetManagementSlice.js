import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";
import { format } from "date-fns";

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

export const getSingleAsset = createAsyncThunk("/asset/assetId", async (id) => {
  try {
    const response = await axios.get(`${API_URL}/asset/${id}`, {
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
});

export const deleteSingleAsset = createAsyncThunk(
  "/asset/delete/assetId",
  async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/asset/delete/${id}`, {
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

export const updateSingleAsset = createAsyncThunk(
  "/asset/update/assetId",
  async ({ id, payload }) => {
    try {
      const response = await axios.put(
        `${API_URL}/asset/update/${id}`,
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

export const createBulkAssets = createAsyncThunk(
  "/asset/bulk/create",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/asset/bulkUpload`,
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

export const getAssetReportCards = createAsyncThunk(
  "/asset/assetReport",
  async ({ startDate, endDate }) => {
    const response = await axios.get(`${API_URL}/asset/assetReport`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`,
      },
      params: {
        startDate,
        endDate,
      },
    });
    return response.data;
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
      .addCase(getSingleAsset.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getSingleAsset.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSingleAsset.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllAssetCategories.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getAllAssetCategories.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllAssetCategories.rejected, (state, action) => {
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
      })
      .addCase(getAssetReportCards.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getAssetReportCards.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAssetReportCards.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = assetManagementSlice.actions;

export default assetManagementSlice.reducer;
