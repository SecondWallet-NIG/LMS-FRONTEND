
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@/constant';
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CenterModal from '@/app/components/modals/CenterModal';
import Button from '@/app/components/shared/buttonComponent/Button';

let user;
if (typeof window !== 'undefined') {
  user = JSON.parse(localStorage.getItem("user"));
}


export const createLoanApplication = createAsyncThunk('LoanApplication/create', async (payload) => {
  try {
    const response = await axios.post(API_URL + '/loan-application/create', payload, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }
  }
});

export const getSingleLoan = createAsyncThunk('loanApplication/getSingleLoan', async (loanId) => {
  try {
    const response = await axios.get(`${API_URL}/loan-application/${loanId}`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });
    console.log({ response });
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const getLoanApprovals = createAsyncThunk('loanApplication/approval', async (loanId) => {
  try {
    const response = await axios.get(`${API_URL}/loan-application/${loanId}/approvals`, {
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

export const getLoanApplication = createAsyncThunk('loanApplication/all', async () => {
  const response = await axios.get(`${API_URL}/loan-application/all`, {
    headers: {
      Authorization: `Bearer ${user?.data?.token}`
    }
  });
  return response.data;
});

export const  getLoanApplicationSummary = createAsyncThunk('loanApplication/summary', async (date) => {
  if (date) {
    console.log(".....",date);
    const response = await axios.get(`${API_URL}/loan-application/summary?startDate=${date?.startDate}&endDate=${date?.endDate}`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });

    return response.data;
  } else {
    const response = await axios.get(`${API_URL}/loan-application/summary`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });

    return response.data;
  }

});

export const updateLoanApplication = createAsyncThunk(
  'LoanApplication/update',
  async ({ loanId, payload }) => {
    try {
      const response = await axios.put(
        `${API_URL}/loan-application/${loanId}/update`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`
          }
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


const LoanApplicationSlice = createSlice({
  name: 'LoanApplication',
  initialState: {
    data: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    clearUserState: (state) => {
      state.data = null;
      state.loading = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoanApplication.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getLoanApplication.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getLoanApplication.rejected, (state, action,) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(getSingleLoan.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getSingleLoan.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getSingleLoan.rejected, (state, action,) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(getLoanApplicationSummary.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getLoanApplicationSummary.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getLoanApplicationSummary.rejected, (state, action,) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateLoanApplication.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(updateLoanApplication.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateLoanApplication.rejected, (state, action,) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(getLoanApprovals.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getLoanApprovals.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getLoanApprovals.rejected, (state, action,) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { clearUserState } = LoanApplicationSlice.actions;

export default LoanApplicationSlice.reducer;
