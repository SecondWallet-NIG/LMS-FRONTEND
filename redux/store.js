// store/configureStore.js
import { configureStore } from "@reduxjs/toolkit";
import approvalAssigneeReducer from "./slices/approvalAssigneeSlice";
import assetReducer from "./slices/assetManagementSlice";
import attendanceReducer from "./slices/attendanceSlice";
import authReducer from "./slices/authSlice";
import customerReducer from "./slices/customerSlice";
import dashboardReducer from "./slices/dashboardSlice";
import employeeBenefitsLogReducer from "./slices/employeeBenefitsLogSlice";
import expenseReducer from "./slices/expenseManagementSlice";
import hrmsReducer from "./slices/hrmsSlice";
import interestTypeReducer from "./slices/interestTypeSlice";
import investmentReducer from "./slices/investmentSlice";
import loanApplicationLogReducer from "./slices/loanApplicationLogSlice";
import loanApplicationReducer from "./slices/loanApplicationSlice";
import loanApprovalReducer from "./slices/loanApprovalSlice";
import LoanPackageReducer from "./slices/loanPackageSlice";
import loanRepaymentReducer from "./slices/loanRepaymentSlice";
import postReducer from "./slices/postSlice";
import repaymentHistoryReducer from "./slices/repaymentHistorySlice";
import reportReducer from "./slices/reportSlice";
import roleReducer from "./slices/roleSlice";
import userReducer from "./slices/userSlice";
import userTaskReducer from "./slices/userTaskSlice";

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
    employeeBenefitsLogs: employeeBenefitsLogReducer,
  },
  // Add middleware or other configuration options as needed
});
