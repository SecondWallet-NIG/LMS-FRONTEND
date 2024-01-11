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

export const getLoanApplicationPaymentHistory = createAsyncThunk(
  "repayment/payment-history",
  async (loadApplicationId) => {
    try {
      const response = await axios.get(
        `${API_URL}/repayment/payment-history/${loadApplicationId}`,
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

export const logRepaymentFunc = createAsyncThunk('loanApplication/repayment', async ({ loanId, payload }) => {
  try {
    const response = await axios.post(`${API_URL}/repayment/log/loan-application/${loanId}`, payload, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const approveLoggedPayment = createAsyncThunk('loanApplication/repayment-approve', async ({ loanId, repaymentId }) => {
  try {
    const response = await axios.get(`${API_URL}/repayment/approve/${loanId}/${repaymentId}`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const declineLoggedPayment = createAsyncThunk('loanApplication/repayment-decline', async ({ loanId, repaymentId }) => {
  try {
    const response = await axios.get(`${API_URL}/repayment/decline/${loanId}/${repaymentId}`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }
    else throw new Error("An error occured, please try again later")
  }
});


export const getDisbursementSummary = createAsyncThunk(
  "disbursement/summary",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/disbursement/summary`, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      }); console.log("disbursement", response.data);
      return response.data;
    } catch (error) {
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else throw new Error("An error occured, please try again later");
    }
  }
);

export const getRepaymentReport = createAsyncThunk('loanApplication/repayment-summary', async (date) => {
  if (date) {

    const response = await axios.get(`${API_URL}/repayment/report?startDate=${date?.startDate}&endDate=${date?.endDate}`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });
    console.log({ response });
    return response.data;
  } else {
    const response = await axios.get(`${API_URL}/repayment/report`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });

    return response.data;
  }

});

const LoanRepaymentSlice = createSlice({
  name: "loanRepayment",
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
      })
      .addCase(logRepaymentFunc.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(logRepaymentFunc.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(logRepaymentFunc.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getDisbursementSummary.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getDisbursementSummary.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getDisbursementSummary.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getRepaymentReport.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getRepaymentReport.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getRepaymentReport.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getLoanApplicationPaymentHistory.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getLoanApplicationPaymentHistory.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getLoanApplicationPaymentHistory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(approveLoggedPayment.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(approveLoggedPayment.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(approveLoggedPayment.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      }).addCase(declineLoggedPayment.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(declineLoggedPayment.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(declineLoggedPayment.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = LoanRepaymentSlice.actions;

export default LoanRepaymentSlice.reducer;
