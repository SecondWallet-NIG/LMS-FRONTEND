// store/configureStore.js
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import customerReducer from "./slices/customerSlice";
import interestTypeReducer from "./slices/interestTypeSlice";
import LoanPackageReducer from "./slices/loanPackageSlice";
import roleReducer from "./slices/roleSlice";
import loanApplicationReducer from "./slices/loanApplicationSlice";
import loanApprovalReducer from "./slices/loanApprovalSlice";
import loanRepaymentReducer from "./slices/loanRepaymentSlice";
import dashboardReducer from "./slices/dashboardSlice";
import approvalAssigneeReducer from "./slices/approvalAssigneeSlice";
import loanApplicationLogReducer from "./slices/loanApplicationLogSlice";
import repaymentHistoryReducer from "./slices/repaymentHistorySlice";
export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    auth: authReducer,
    customer: customerReducer,
    role: roleReducer,
    interestType: interestTypeReducer,
    loanPackage: LoanPackageReducer,
    loanApplication: loanApplicationReducer,
    loanApprovals: loanApprovalReducer,
    loanRepayment: loanRepaymentReducer,
    dashboardData: dashboardReducer,
    approvalAssignee: approvalAssigneeReducer,
    loanApplicationLogs : loanApplicationLogReducer,
    repaymentHistory: repaymentHistoryReducer
  },
  // Add middleware or other configuration options as needed
});
