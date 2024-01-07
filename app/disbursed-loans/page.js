"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import DisbursedLoans from "../components/loans/DisbursedLoans";


const LoanApplications = () => {
    return (
        <DashboardLayout     isBackNav={true}>
            <DisbursedLoans />
        </DashboardLayout>
    );
};

export default LoanApplications;