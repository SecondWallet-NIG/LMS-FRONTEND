import { API_URL } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
}
export const createLoanApplication = createAsyncThunk(
  "LoanApplication/create",
  async (payload) => {
    try {
      const response = await axios.post(
        API_URL + "/loan-application/create",
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

export const requestLoanRestructure = createAsyncThunk(
  "LoanApplication/RequestRestructure",
  async ({ loanId, payload }) => {
    try {
      const response = await axios.post(
        `${API_URL}/loan-restructure/${loanId}/request`,
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

export const approveRestructureRequest = createAsyncThunk(
  "LoanApplication/ApproveRestructure",
  async ({ requestId, payload }) => {
    try {
      const response = await axios.put(
        `${API_URL}/loan-restructure/${requestId}/approve`,
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

export const declineRestructureRequest = createAsyncThunk(
  "LoanApplication/DeclineRestructure",
  async ({ requestId, payload }) => {
    try {
      const response = await axios.put(
        `${API_URL}/loan-restructure/${requestId}/decline`,
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

export const getSingleLoan = createAsyncThunk(
  "loanApplication/getSingleLoan",
  async (loanId) => {
    try {
      const response = await axios.get(
        `${API_URL}/loan-application/${loanId}`,
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

// export const getLoanApprovals = createAsyncThunk('loanApplication/approval', async (loanId) => {
//   try {
//     const response = await axios.get(`${API_URL}/loan-application/${loanId}/approvals`, {
//       headers: {
//         Authorization: `Bearer ${user?.data?.token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     if (error.response.data.error) {
//       throw new Error(error.response.data.error)
//     }
//     else throw new Error("An error occured, please try again later")
//   }
// });

export const correctLoanAction = createAsyncThunk(
  "loanApplication/approval",
  async (payload) => {
    try {
      const response = await axios.patch(
        `${API_URL}/loan-application/update-fields`,
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

export const disburseLoan = createAsyncThunk(
  "loanApplication/disburse",
  async ({ loanId, payload }) => {
    try {
      const response = await axios.post(
        `${API_URL}/loan-application/${loanId}/approve-for-disbursal`,
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

export const diosbursementSummary = createAsyncThunk(
  "loanApplication/disburse/summary",
  async (loanId) => {
    try {
      const response = await axios.get(`${API_URL}/disbursement/summary`, {
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

export const loanStatementOfAccount = createAsyncThunk(
  "loan-statement-of-account",
  async (loanId, { getState }) => {
    try {
      const { user } = getState(); // Assuming you have user in the state
      const response = await axios.get(
        `${API_URL}/loan-application/${loanId}/statement-of-account`,
        {
          responseType: "blob", // Important to handle blob data
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        }
      );

      // Create a URL for the blob data
      const url = URL.createObjectURL(response.data);
      return url;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("An error occurred, please try again later");
      }
    }
  }
);

export const getLoanApplication = createAsyncThunk(
  "loanApplication/all",
  async () => {
    const response = await axios.get(`${API_URL}/loan-application/all`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`,
      },
    });
    return response.data;
  }
);

export const getLoanApplicationSummary = createAsyncThunk(
  "loanApplication/summary",
  async (date) => {
    if (date) {
      const response = await axios.get(
        `${API_URL}/loan-application/summary?startDate=${date?.startDate}&endDate=${date?.endDate}`,
        {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        }
      );

      return response.data;
    } else {
      const response = await axios.get(`${API_URL}/loan-application/summary`, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });

      return response.data;
    }
  }
);

export const getCustomerLoanApplicationSummary = createAsyncThunk(
  "loanApplication/summary/customer",
  async (data) => {
    if (data) {
      const response = await axios.get(
        `${API_URL}/loan-application/summary?customerId=${data?.customerId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        }
      );

      return response.data;
    } else {
      const response = await axios.get(`${API_URL}/loan-application/summary`, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });

      return response.data;
    }
  }
);
export const updateLoanApplication = createAsyncThunk(
  "LoanApplication/update",
  async ({ loanId, payload }) => {
    try {
      const response = await axios.put(
        `${API_URL}/loan-application/${loanId}/update`,
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

export const getCustomerLoans = createAsyncThunk(
  "loanApplication/getSingleLoan",
  async (loanId) => {
    try {
      const response = await axios.get(
        `${API_URL}/loan-application/${loanId}`,
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

export const getDisbursementById = createAsyncThunk(
  "loanApplication/disbursement",
  async (loanId) => {
    try {
      const response = await axios.get(
        `${API_URL}/disbursement/loan-application/${loanId}`,
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

const LoanApplicationSlice = createSlice({
  name: "LoanApplication",
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
      .addCase(getLoanApplication.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getLoanApplication.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getLoanApplication.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getSingleLoan.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getSingleLoan.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSingleLoan.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getLoanApplicationSummary.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getLoanApplicationSummary.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getLoanApplicationSummary.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(updateLoanApplication.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(updateLoanApplication.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateLoanApplication.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(disburseLoan.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(disburseLoan.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(disburseLoan.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getCustomerLoanApplicationSummary.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getCustomerLoanApplicationSummary.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getCustomerLoanApplicationSummary.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(diosbursementSummary.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(diosbursementSummary.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(diosbursementSummary.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(loanStatementOfAccount.pending, (state) => {
        state.loading = "pending";
        state.statementPending = null;
      })
      .addCase(loanStatementOfAccount.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.statementData = action.payload;
      })
      .addCase(loanStatementOfAccount.rejected, (state, action) => {
        state.loading = "failed";
        state.statementFailed = action.error.message;
      })
      .addCase(getDisbursementById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getDisbursementById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getDisbursementById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = LoanApplicationSlice.actions;

export default LoanApplicationSlice.reducer;
