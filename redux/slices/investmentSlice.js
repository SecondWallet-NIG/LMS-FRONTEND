import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";
import { getToken } from "@/helpers";

// investmentProducts

export const createInvestmentProduct = createAsyncThunk(
  "investment/product/create",
  async (payload) => {
    try {
      let token = getToken();

      console.log({ token });
      const response = await axios.post(
        `${API_URL}/investment/product/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      let token = getToken();
      const response = await axios.get(`${API_URL}/investment/product/${id}`, {
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

export const getAllInvestmentProducts = createAsyncThunk(
  "investment/product/all",
  async () => {
    try {
      let token = getToken();
      const response = await axios.get(`${API_URL}/investment/product/all`, {
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

export const deleteSingleInvestmentProduct = createAsyncThunk(
  "investment/product/investmentProductId/delete",
  async (id) => {
    try {
      let token = getToken();
      const response = await axios.delete(
        `${API_URL}/investment/product/${id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      let token = getToken();
      const response = await axios.put(
        `${API_URL}/investment/product/${id}/update`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      let token = getToken();
      const response = await axios.post(
        `${API_URL}/investment/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

export const getAllInvestments = createAsyncThunk(
  "investment/all",
  async () => {
    try {
      let token = getToken();
      const response = await axios.get(`${API_URL}/investment/all`, {
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

export const getSingleInvestment = createAsyncThunk(
  "investment/investmentId",
  async (id) => {
    try {
      let token = getToken();
      const response = await axios.get(`${API_URL}/investment/${id}`, {
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

export const getTransactionHistory = createAsyncThunk(
  "/investment/transactions/nvestmentId",
  async (id) => {
    try {
      let token = getToken();
      const response = await axios.get(
        `${API_URL}/investment/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

export const closeInvestment = createAsyncThunk(
  "investment/investmentId/close",
  async ({ id, payload }) => {
    try {
      let token = getToken();
      const response = await axios.patch(
        `${API_URL}/investment/${id}/close`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

export const topUpInvestment = createAsyncThunk(
  "investment/investmentId/topup",
  async ({ id, payload }) => {
    try {
      let token = getToken();
      const response = await axios.put(
        `${API_URL}/investment/${id}/topup`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      let token = getToken();
      const response = await axios.post(
        `${API_URL}/investment/investor/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      let token = getToken();
      const response = await axios.get(`${API_URL}/investment/investor/${id}`, {
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

export const getPortfolioHealth = createAsyncThunk(
  "investment/investor/investorProfileId/portfolio-health",
  async (id) => {
    try {
      let token = getToken();
      const response = await axios.get(`${API_URL}/investment/investor/${id}/portfolio-health`, {
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

export const getAllInvestors = createAsyncThunk(
  "investment/investor/all",
  async () => {
    try {
      let token = getToken();
      const response = await axios.get(`${API_URL}/investment/investor/all`, {
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

export const updateInvestor = createAsyncThunk(
  "investment/investor/investorProfileId/update",
  async ({ id, payload }) => {
    try {
      let token = getToken();
      const response = await axios.put(
        `${API_URL}/investment/investor/${id}/update`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

export const getInvestmentReportCards = createAsyncThunk(
  "investment/report",
  async ({ startDate, endDate }) => {
    let token = getToken();
    const response = await axios.get(`${API_URL}/investment/report`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        startDate,
        endDate,
      },
    });
    return response.data;
  }
);

export const getROI = createAsyncThunk(
  "investment/preview/roi-details",
  async (payload) => {
    try {
      let token = getToken();
      const response = await axios.post(
        `${API_URL}/investment/preview/roi-details`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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


export const disburseROI = createAsyncThunk(
  "investment/withdrawal-request/withdrawalRequestId/approve",
  async ({ id, payload }) => {
    try {
      let token = getToken();
      const response = await axios.patch(
        `${API_URL}/investment/withdrawal-request/${id}/approve`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

// Withdrawal

export const withdrawalSummary = createAsyncThunk(
  "investment/withdrawal-requests/summary",
  async () => {
    try {
      let token = getToken();
      const response = await axios.get(
        `${API_URL}/investment/withdrawal-requests/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

export const createWithdrawalRequest = createAsyncThunk(
  "investment/investmentId/withdrawal-request/create",
  async ({ id, payload }) => {
    try {
      let token = getToken();
      const response = await axios.post(
        `${API_URL}/investment/${id}/withdrawal-request/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

export const getSingleWithdrawalRequest = createAsyncThunk(
  "investment/withdrawal-request/withdrawalRequestId",
  async (id) => {
    try {
      let token = getToken();
      const response = await axios.get(
        `${API_URL}/investment/withdrawal-request/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      .addCase(getAllInvestors.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getAllInvestors.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllInvestors.rejected, (state, action) => {
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
      })
      .addCase(getSingleInvestment.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getSingleInvestment.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSingleInvestment.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllInvestmentProducts.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getAllInvestmentProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllInvestmentProducts.rejected, (state, action) => {
        console.log("action.error.message", action.error.message);
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getInvestmentReportCards.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getInvestmentReportCards.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.getInvestmentReportCardsData = action.payload;
      })
      .addCase(getInvestmentReportCards.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getPortfolioHealth.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getPortfolioHealth.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.healthData = action.payload;
      })
      .addCase(getPortfolioHealth.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getSingleWithdrawalRequest.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getSingleWithdrawalRequest.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSingleWithdrawalRequest.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllInvestments.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getAllInvestments.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllInvestments.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(withdrawalSummary.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(withdrawalSummary.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(withdrawalSummary.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = investmentSlice.actions;

export default investmentSlice.reducer;
