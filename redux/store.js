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
import userTaskReducer from "./slices/userTaskSlice";
import reportReducer from "./slices/reportSlice";
import assetReducer from "./slices/assetManagementSlice";
import expenseReducer from "./slices/expenseManagementSlice";
import investmentReducer from "./slices/investmentSlice";
import hrmsReducer from "./slices/hrmsSlice";
import attendanceReducer from "./slices/attendanceSlice";

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
    UserTasks: userTaskReducer,
    loanApplicationLogs: loanApplicationLogReducer,
    repaymentHistory: repaymentHistoryReducer,
    report: reportReducer,
    asset: assetReducer,
    expense: expenseReducer,
    investment: investmentReducer,
    hrms: hrmsReducer,
    attendance: attendanceReducer,
  },
  // Add middleware or other configuration options as needed
});
