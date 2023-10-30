import ViewLoanSummaryCard from "../../cards/Summary card/ViewLoanSummaryCard";

const ViewLoanSummary = () => {
  const data = [
    { loan_detail: "loan_amount", amount: 3000000, period_or_interest: "" },
    { loan_detail: "amount_dispensed", amount: "", period_or_interest: "" },
    { loan_detail: "loan_period", amount: 3, period_or_interest: "months" },
    {
      loan_detail: "number_of_repayment_cycles",
      amount: 3,
      period_or_interest: "monthly",
    },
    { loan_detail: "loan_fee", amount: 3000, period_or_interest: "1%" },
    { loan_detail: "interest", amount: 30000, period_or_interest: "10%" },
    { loan_detail: "penalty", amount: 3500, period_or_interest: "" },
    { loan_detail: "maturity_amount", amount: 330000, period_or_interest: "" },
  ];

  const FinancialsData = [
    { loan_detail: "total_repayments", amount: 0, period_or_interest: "" },
    { loan_detail: "loan_fee", amount: 3000, period_or_interest: "1%" },
    { loan_detail: "loan_fee", amount: 3000, period_or_interest: "1%" },
  ];
  return (
    <main>
      <p className="font-semibold text-md mb-4">Loan Stats</p>
      <ViewLoanSummaryCard data={data} />
      <p className="font-semibold  text-md my-4">Financials</p>
      <ViewLoanSummaryCard data={FinancialsData} />
    </main>
  );
};

export default ViewLoanSummary;
