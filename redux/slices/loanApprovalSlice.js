
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

// export const getLoanApproval = createAsyncThunk('LoanApproval/all', async () => {
//   const response = await axios.get(`${API_URL}/loan-application/all`, {
//     headers: {
//       Authorization: `Bearer ${user?.data?.token}`
//     }
//   });
//   return response.data;
// });

// export const  getLoanApprovalSummary = createAsyncThunk('LoanApproval/summary', async (date) => {
//   if (date) {
//     console.log(".....",date);
//     const response = await axios.get(`${API_URL}/loan-application/summary?startDate=${date?.startDate}&endDate=${date?.endDate}`, {
//       headers: {
//         Authorization: `Bearer ${user?.data?.token}`
//       }
//     });

//     return response.data;
//   } else {
//     const response = await axios.get(`${API_URL}/loan-application/summary`, {
//       headers: {
//         Authorization: `Bearer ${user?.data?.token}`
//       }
//     });

//     return response.data;
//   }

// });

// export const updateLoanApproval = createAsyncThunk(
//   'LoanApproval/update',
//   async ({ loanId, payload }) => {
//     try {
//       const response = await axios.put(
//         `${API_URL}/loan-application/${loanId}/update`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${user?.data?.token}`
//           }
//         }
//       );
//       return response.data;
//     } catch (error) {
//       if (error.response.data.error) {
//         throw new Error(error.response.data.error);
//       }
//     }
//   }
// );


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
  },
});

export const { clearUserState } = LoanApprovalSlice.actions;

export default LoanApprovalSlice.reducer;
