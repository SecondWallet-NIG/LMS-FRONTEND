//Dashboard Roles
export const dashboardAuthRoles = [
  "LO",
  "CFO",
  "FCO",
  "CEO",
  "CAO",
  "ICO",
  "COF",
  "FO",
  "LR0",
  "CTO",
  "HRM",
  "Dir",
  "System Admin",
];

// My-task Roles
export const myTaskAuthRoles = [
  "LO",
  "CFO",
  "FCO",
  "CEO",
  "CAO",
  "ICO",
  "COF",
  "FO",
  "LR0",
  "CTO",
  "HRM",
  "Dir",
  "System Admin",
];

// borrowers roles
export const borrowersAuthRoles = [
  "LO",
  "CFO",
  "FCO",
  "CEO",
  "CAO",
  "FO",
  "ICO",
  "COF",
  "LR0",
  "CTO",
  "Dir",
  "System Admin",
];

// create loan
export const createLoanAuthRoles = [
  "LO",
  "CTO",
  "CEO",
  "CFO",
  "FCO",
  "Dir",
  "System Admin",
];

/** Whether the signed-in role may open / submit create-loan (mirrors backend allowlist). */
export const canCreateLoan = (roleTag, permissions = []) => {
  if (roleTag && createLoanAuthRoles.includes(roleTag)) {
    return true;
  }
  const perms = Array.isArray(permissions) ? permissions : [];
  return perms.some((p) =>
    /create[\s_-]?loan|loan[\s_-]?creat/i.test(String(p || ""))
  );
};

// loan application
export const loanApplicationAuthRoles = [
  "LO",
  "CFO",
  "FCO",
  "CEO",
  "CAO",
  "ICO",
  "FO",
  "COF",
  "LR0",
  "CTO",
  "Dir",
  "System Admin",
];

// loan drafts
export const loanDraftsAuthRoles = [
  "LO",
  "CFO",
  "FCO",
  "CEO",
  "CAO",
  "ICO",
  "COF",
  "FO",
  "LR0",
  "CTO",
  "Dir",
  "System Admin",
];

// disbursement
export const disbursementAuthRoles = [
  "LO",
  "CFO",
  "FCO",
  "CEO",
  "CAO",
  "ICO",
  "COF",
  "FO",
  "LR0",
  "CTO",
  "Dir",
  "System Admin",
];

// repayment
export const repaymentAuthRoles = [
  "LO",
  "CFO",
  "FCO",
  "CEO",
  "FO",
  "CAO",
  "ICO",
  "COF",
  "CTO",
  "LR0",
  "Dir",
  "System Admin",
];

// payment history
export const paymentHistoryAuthRoles = [
  "LO",
  "CFO",
  "FCO",
  "CEO",
  "CAO",
  "FO",
  "ICO",
  "COF",
  "CTO",
  "LR0",
  "Dir",
  "System Admin",
];

// report
export const reportAuthRoles = [
  "LO",
  "CFO",
  "FCO",
  "CEO",
  "CAO",
  "FO",
  "HRM",
  "CTO",
  "Dir",
  "System Admin",
];

// plans (loanPackages)
export const plansAuthRoles = [
  "LO",
  "CFO",
  "FCO",
  "CEO",
  "CAO",
  "CTO",
  "Dir",
  "System Admin",
];

// expenses
export const expensesAuthRoles = [
  // "LO",
  "CFO",
  "FCO",
  "CEO",
  "CAO",
  "CTO",
  "HRM",
  "Dir",
  "OFA",
  "System Admin",
];

// asset management
export const assetManagementAuthRoles = [
  // "LO",
  "CFO",
  "FCO",
  "CEO",
  "CAO",
  "HRM",
  "CTO",
  "OFA",
  "Dir",
  "System Admin",
];

// team management
export const teamManagementAuthRoles = [
  "CFO",
  "FCO",
  "CEO",
  "CTO",
  "Dir",
  "HRM",
  "System Admin",
];

// investors
export const investorsAuthRoles = [
  "CFO",
  "FCO",
  "CEO",
  "ICO",
  "FO",
  "CTO",
  "Dir",
  "System Admin",
];

// employee dashboard
export const employeeDashboardAuthRoles = [
  "FDO",
  "LO",
  "CFO",
  "FCO",
  "CEO",
  "CAO",
  "ICO",
  "COF",
  "GS",
  "CTO",
  "LR0",
  "FO",
  "Dir",
  "OFA",
  "HRM",
  "System Admin",
];
