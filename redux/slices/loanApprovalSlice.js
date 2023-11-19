
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@/constant';


let user;
if (typeof window !== 'undefined') {
  user = JSON.parse(localStorage.getItem("user"));
}


export const getLoanApprovals = createAsyncThunk('loanApproval/approval', async (loanId) => {
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

export const getApprovalAssignee = createAsyncThunk('loanApproval/assignee', async (assigneeId) => {
  try {
    const response = await axios.get(`${API_URL}/loan-application/task/${assigneeId}`, {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });
    console.log("response");
    console.log({response});
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const requestLoanApproval = createAsyncThunk('loanApproval/request-approval', async (payload) => {
  try {
   console.log({payload});
    const response = await axios.post(API_URL + `/loan-application/${payload.id}/approval/request-approval`, payload.formData, {
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

const LoanApprovalSlice = createSlice({
  name: 'LoanApprovals',
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
      .addCase(requestLoanApproval.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(requestLoanApproval.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(requestLoanApproval.rejected, (state, action,) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(getApprovalAssignee.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getApprovalAssignee.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getApprovalAssignee.rejected, (state, action,) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { clearUserState } = LoanApprovalSlice.actions;

export default LoanApprovalSlice.reducer;
