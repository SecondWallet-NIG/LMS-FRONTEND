import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}

export const getSummaryReport = createAsyncThunk(
  "SummaryReport/all",
  async () => {
    const response = await axios.get(`${API_URL}/report/summary/cards-data`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`,
      },
    });
    return response.data;
  }
);

export const getExpenseReportGraph = createAsyncThunk(
  "expense/graph",
  async () => {
    const response = await axios.get(`${API_URL}/report/expense/table-data`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`,
      },
    });
    return response.data;
  }
);

export const getTeamManagementSummary = createAsyncThunk(
  "team/summary",
  async () => {
    const response = await axios.get(`${API_URL}/report/team/summary`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`,
      },
    });
    return response.data;
  }
);

export const generateGeneralStatementOfAccount = createAsyncThunk(
  "team/generate", 
  async (_, { rejectWithValue }) => {
    try {
      const token = user?.data?.token;
      if (!token) {
        return rejectWithValue("Token is missing or invalid.");
      }

      // Set responseType to 'arraybuffer' to handle binary data (Excel file)
      const response = await axios.get(`${API_URL}/financial-year/general/financial-statement`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'arraybuffer',  // Important: tells axios to treat response as binary data
      });

      console.log("API response", response);

      return response.data;  // This will be a binary file (ArrayBuffer)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || "Something went wrong");
    }
  }
);


const reportSlice = createSlice({
  name: "report",
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
      .addCase(getSummaryReport.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getSummaryReport.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSummaryReport.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getExpenseReportGraph.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getExpenseReportGraph.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getExpenseReportGraph.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getTeamManagementSummary.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getTeamManagementSummary.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getTeamManagementSummary.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(generateGeneralStatementOfAccount.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(generateGeneralStatementOfAccount.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(generateGeneralStatementOfAccount.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      })

  },
});

export const { clearUserState } = reportSlice.actions;

export default reportSlice.reducer;
