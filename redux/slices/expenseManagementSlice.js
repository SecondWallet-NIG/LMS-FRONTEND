import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}

export const createExpense = createAsyncThunk(
  "expense/create",
  async (payload) => {
    try {
      const response = await axios.post(`${API_URL}/expense/create`, payload, {
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

export const createBulkExpenses = createAsyncThunk(
  "expense/bulk/create",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/expense/bulkUpload`,
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

export const getAllExpenses = createAsyncThunk("expense", async () => {
  const response = await axios.get(`${API_URL}/expense`, {
    headers: {
      Authorization: `Bearer ${user?.data?.token}`,
    },
  });
  return response.data;
});

export const getSingleExpense = createAsyncThunk(
  "/expense/assetId",
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/expense/${id}`, {
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

export const updateSingleExpense = createAsyncThunk(
  "expense/expenseId",
  async ({ id, payload }) => {
    try {
      const response = await axios.put(
        `${API_URL}/expense/update/${id}`,
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

export const deleteSingleExpense = createAsyncThunk(
  "/expense/delete/assetId",
  async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/expense/delete/${id}`, {
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

export const createExpenseCategory = createAsyncThunk(
  "/expense-category/create",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/expense-category/create`,
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

export const getAllExpenseCategories = createAsyncThunk(
  "expense/category",
  async () => {
    const response = await axios.get(`${API_URL}/expense-category`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`,
      },
    });
    return response.data;
  }
);

export const getExpenseReportCards = createAsyncThunk(
  "/expense/report",
  async ({ startDate, endDate }) => {
    const response = await axios.get(`${API_URL}/expense/report`, {
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

const expenseManagementSlice = createSlice({
  name: "expense",
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
      .addCase(getAllExpenses.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getAllExpenses.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllExpenses.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(createExpense.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(createExpense.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getExpenseReportCards.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getExpenseReportCards.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getExpenseReportCards.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = expenseManagementSlice.actions;

export default expenseManagementSlice.reducer;
